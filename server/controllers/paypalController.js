
const { createPaypalOrderId, capturePaypalOrder } = require("../utils/paypal");
const Order = require("../models/Order");
const { sendEmail } = require("../utils/sendEmail");
const mongoose = require('mongoose');
const discountController = require("./discountController");

const createOrder = async (req, res) => {
  try {
    const { formData, cartItems, shippingMethod, subtotal, discount = 0, shipping, tax, total, couponCode } = req.body;

    if (
      !formData ||
      !cartItems ||
      !shippingMethod ||
      subtotal === undefined ||
      shipping === undefined ||
      tax === undefined ||
      total === undefined
    ) {
      return res.status(400).json({
        error: "Missing required fields",
        details: { formData, cartItems, shippingMethod, subtotal, discount, shipping, tax, total },
      });
    }
    if (!cartItems.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      return res.status(400).json({ error: "Missing required formData fields" });
    }
    if (total <= 0 || isNaN(total)) {
      return res.status(400).json({ error: "Invalid total amount" });
    }
    if (!["standard", "express"].includes(shippingMethod)) {
      return res.status(400).json({ error: "Invalid shipping method" });
    }
    for (const item of cartItems) {
      if (!item.id || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({ error: `Invalid cart item: ${JSON.stringify(item)}` });
      }
    }

    const paypalOrder = await createPaypalOrderId({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: { currency_code: "USD", value: subtotal.toFixed(2) },
              shipping: { currency_code: "USD", value: shipping.toFixed(2) },
              tax_total: { currency_code: "USD", value: tax.toFixed(2) },
              discount: discount > 0 ? { currency_code: "USD", value: discount.toFixed(2) } : undefined,
            },
          },
          items: cartItems.map((item) => ({
            name: item.name || "Unknown Product",
            quantity: item.quantity.toString(),
            unit_amount: { currency_code: "USD", value: (item.price || 0).toFixed(2) },
          })),
          shipping: {
            address: {
              address_line_1: formData.address,
              admin_area_2: formData.city,
              admin_area_1: formData.state,
              postal_code: formData.zipCode,
              country_code: "US",
            },
          },
        },
      ],
      payer: {
        email_address: formData.email,
        name: { given_name: formData.firstName, surname: formData.lastName },
      },
    });

    const order = new Order({
      user: {
        userId: req.user._id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || "",
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || "",
        color: item.color || "",
        image: item.image || "",
      })),
      paymentMethod: "paypal",
      paypalOrderId: paypalOrder.id,
      paymentStatus: "pending",
      shippingMethod,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      orderStatus: "pending",
      trackingNumber: null,
      isDelivered: false,
      couponCode: couponCode || null,
    });

    await order.save();
    console.log(`Order saved with ID: ${order._id}`);
    res.status(200).json({ id: paypalOrder.id });
  } catch (error) {
    console.error("Error creating PayPal order:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    res.status(error.response?.status || 400).json({
      error: error.response?.data?.message || error.message || "Failed to create order",
      details: error.response?.data?.details || error.response?.data,
    });
  }
};

const captureOrder = async (req, res) => {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const captureData = await capturePaypalOrder(orderID);

    const order = await Order.findOneAndUpdate(
      { paypalOrderId: orderID },
      {
        paypalTransactionId: captureData.purchase_units[0].payments.captures[0].id,
        paymentStatus: captureData.status === "COMPLETED" ? "completed" : "failed",
        orderStatus: captureData.status === "COMPLETED" ? "processing" : "pending",
        isDelivered: false,
        deliveredAt: null,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (captureData.status === "COMPLETED") {
      if (order.couponCode) {
        try {
          await discountController.incrementUsage(order.couponCode);
          console.log(`Discount usage incremented for code: ${order.couponCode}`);
        } catch (discountError) {
          console.error("Failed to increment discount usage:", discountError.message);
        }
      }

      try {
        const emailHtml = `
          <h2>Order Confirmation</h2>
          <p>Dear ${order.user.firstName} ${order.user.lastName},</p>
          <p>Thank you for your purchase! Your order has been successfully placed.</p>
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Transaction ID:</strong> ${order.paypalTransactionId}</p>
          <p><strong>Address:</strong> ${order.user.address}, ${order.user.city}, ${order.user.state}, ${order.user.zipCode}</p>
          <p><strong>Shipping Method:</strong> ${order.shippingMethod}</p>
          <h3>Items:</h3>
          <ul>
            ${order.items
              .map(
                (item) => `
                  <li>
                    ${item.name} (Qty: ${item.quantity}, Price: $${item.price.toFixed(2)}${item.size ? `, Size: ${item.size}` : ""}${
                      item.color ? `, Color: ${item.color}` : ""
                    })
                  </li>
                `
              )
              .join("")}
          </ul>
          <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
          <p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>
          <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
          ${order.discount > 0 ? `<p><strong>Discount:</strong> $${order.discount.toFixed(2)}</p>` : ""}
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          <p>We will notify you once your order has been shipped.</p>
          <p>Best regards,<br>Your E-commerce Team</p>
        `;
        await sendEmail(
          order.user.email,
          `Order Confirmation - Order #${order._id}`,
          `Thank you for your order! Your order #${order._id} has been successfully placed.`,
          emailHtml
        );
        console.log(`Email sent successfully to ${order.user.email} for order ${order._id}`);
      } catch (emailError) {
        console.error("Failed to send email after capturing order:", {
          message: emailError.message,
          email: order.user.email,
          orderId: order._id,
        });
      }
    }

    res.status(200).json(captureData);
  } catch (error) {
    console.error("Error capturing PayPal order:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.message || error.message || "Failed to capture order",
      details: error.response?.data?.details,
    });
  }
};

const updateTracking = async (req, res) => {
  try {
    const { trackingNumber, orderStatus } = req.body;
    const orderId = req.params.id;
    console.log(`Received orderId: ${orderId}, type: ${typeof orderId}`);

    if (!mongoose.isValidObjectId(orderId)) {
      console.warn(`Invalid ObjectId format: ${orderId}`);
      return res.status(400).json({ error: "Invalid order ID format" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      console.log(`Order not found for ID: ${orderId}`);
      return res.status(404).json({ error: "Order not found" });
    }

    if (!req.user.isAdmin) {
      console.log(`Access denied for user ${req.user._id}: Not an admin`);
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    if (orderStatus && !["pending", "processing", "shipped", "delivered", "cancelled"].includes(orderStatus)) {
      console.log(`Invalid order status: ${orderStatus}`);
      return res.status(400).json({ error: "Invalid order status" });
    }

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
    }
    if (orderStatus) {
      order.orderStatus = orderStatus;
      if (orderStatus === "delivered" && order.paymentMethod === "cod") {
        order.paymentStatus = "completed";
        order.isDelivered = true;
        order.deliveredAt = new Date();
      } else if (orderStatus === "delivered") {
        order.isDelivered = true;
        order.deliveredAt = new Date();
      } else {
        order.isDelivered = false;
        order.deliveredAt = null;
      }
    }

    await order.save();
    console.log(`Order ${orderId} updated successfully: status=${order.orderStatus}, tracking=${order.trackingNumber}`);
    
    if (orderStatus === "delivered" && order.paymentMethod === "cod") {
      try {
        const emailHtml = `
          <h2>Order Delivered</h2>
          <p>Dear ${order.user.firstName} ${order.user.lastName},</p>
          <p>Your order #${order._id} has been successfully delivered and payment has been received.</p>
          <h3>Order Details</h3>
          <p><strong>Order ID:</strong> ${order._id}</p>
          <p><strong>Payment Method:</strong> Cash on Delivery</p>
          <p><strong>Address:</strong> ${order.user.address}, ${order.user.city}, ${order.user.state}, ${order.user.zipCode}</p>
          <p><strong>Shipping Method:</strong> ${order.shippingMethod}</p>
          <h3>Items:</h3>
          <ul>
            ${order.items
              .map(
                (item) => `
                  <li>
                    ${item.name} (Qty: ${item.quantity}, Price: $${item.price.toFixed(2)}${item.size ? `, Size: ${item.size}` : ""}${
                      item.color ? `, Color: ${item.color}` : ""
                    })
                  </li>
                `
              )
              .join("")}
          </ul>
          <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
          <p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>
          <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
          ${order.discount > 0 ? `<p><strong>Discount:</strong> $${order.discount.toFixed(2)}</p>` : ""}
          <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
          <p>Thank you for shopping with us!</p>
          <p>Best regards,<br>Your E-commerce Team</p>
        `;
        await sendEmail(
          order.user.email,
          `Order Delivered - Order #${order._id}`,
          `Your order #${order._id} has been delivered.`,
          emailHtml
        );
        console.log(`Delivery email sent to ${order.user.email} for order ${order._id}`);
      } catch (emailError) {
        console.error("Failed to send delivery email:", {
          message: emailError.message,
          email: order.user.email,
          orderId: order._id,
        });
      }
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating tracking:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to update tracking", details: error.message });
  }
};

const resendOrderConfirmationEmail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      console.log(`Order not found for ID: ${req.params.id}`);
      return res.status(404).json({ error: "Order not found" });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }

    if (order.paymentMethod === "paypal" && order.paymentStatus !== "completed") {
      return res.status(400).json({ error: "PayPal order payment not completed" });
    }

    if (order.paymentMethod === "cod" && !["processing", "shipped", "delivered"].includes(order.orderStatus)) {
      return res.status(400).json({ error: "COD order not in a valid state for resending confirmation" });
    }

    const emailHtml = `
      <h2>Order Confirmation</h2>
      <p>Dear ${order.user.firstName} ${order.user.lastName},</p>
      <p>Thank you for your purchase! Your order has been successfully placed.</p>
      <h3>Order Details</h3>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod === "cod" ? "Cash on Delivery" : "PayPal"}</p>
      ${order.paymentMethod === "paypal" ? `<p><strong>Transaction ID:</strong> ${order.paypalTransactionId || "N/A"}</p>` : ""}
      <p><strong>Address:</strong> ${order.user.address}, ${order.user.city}, ${order.user.state}, ${order.user.zipCode}</p>
      <p><strong>Shipping Method:</strong> ${order.shippingMethod}</p>
      <h3>Items:</h3>
      <ul>
        ${order.items
          .map(
            (item) => `
              <li>
                ${item.name} (Qty: ${item.quantity}, Price: $${item.price.toFixed(2)}${item.size ? `, Size: ${item.size}` : ""}${
                  item.color ? `, Color: ${item.color}` : ""
                })
              </li>
            `
          )
          .join("")}
      </ul>
      <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
      <p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>
      <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
      ${order.discount > 0 ? `<p><strong>Discount:</strong> $${order.discount.toFixed(2)}</p>` : ""}
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <p>We will notify you once your order has been shipped.</p>
      <p>Best regards,<br>Your E-commerce Team</p>
    `;

    await sendEmail(
      order.user.email,
      `Order Confirmation - Order #${order._id}`,
      `Thank you for your order! Your order #${order._id} has been successfully placed.`,
      emailHtml
    );

    console.log(`Order confirmation email resent successfully to ${order.user.email} for order ${order._id}`);
    res.status(200).json({ message: "Order confirmation email resent successfully" });
  } catch (error) {
    console.error("Error resending order confirmation email:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    res.status(500).json({ error: "Failed to resend order confirmation email", details: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(`User ${req.user._id} attempting to cancel order ${orderId}`);

    if (!mongoose.isValidObjectId(orderId)) {
      console.warn(`Invalid ObjectId format: ${orderId}`);
      return res.status(400).json({ error: "Invalid order ID format" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      console.log(`Order not found for ID: ${orderId}`);
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.user.userId.toString() !== req.user._id.toString()) {
      console.log(`Access denied for user ${req.user._id}: Order ${orderId} does not belong to this user`);
      return res.status(403).json({ error: "Access denied. You can only cancel your own orders." });
    }

    if (order.orderStatus !== "pending" && order.orderStatus !== "processing") {
      console.log(`Order ${orderId} cannot be cancelled, current status: ${order.orderStatus}`);
      return res.status(400).json({ error: "Only pending or processing orders can be cancelled" });
    }

    order.orderStatus = "cancelled";
    if (order.paymentMethod === "cod") {
      order.paymentStatus = "cancelled";
    }
    await order.save();
    console.log(`Order ${orderId} cancelled successfully by user ${req.user._id}`);

    try {
      const emailHtml = `
        <h2>Order Cancellation Confirmation</h2>
        <p>Dear ${order.user.firstName} ${order.user.lastName},</p>
        <p>Your order #${order._id} has been successfully cancelled.</p>
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod === "cod" ? "Cash on Delivery" : "PayPal"}</p>
        ${order.paymentMethod === "paypal" ? `<p><strong>Transaction ID:</strong> ${order.paypalTransactionId || "N/A"}</p>` : ""}
        <p><strong>Address:</strong> ${order.user.address}, ${order.user.city}, ${order.user.state}, ${order.user.zipCode}</p>
        <p><strong>Shipping Method:</strong> ${order.shippingMethod}</p>
        <h3>Items:</h3>
        <ul>
          ${order.items
            .map(
              (item) => `
                <li>
                  ${item.name} (Qty: ${item.quantity}, Price: $${item.price.toFixed(2)}${item.size ? `, Size: ${item.size}` : ""}${
                    item.color ? `, Color: ${item.color}` : ""
                  })
                </li>
              `
            )
            .join("")}
        </ul>
        <p><strong>Subtotal:</strong> $${order.subtotal.toFixed(2)}</p>
        <p><strong>Shipping:</strong> $${order.shipping.toFixed(2)}</p>
        <p><strong>Tax:</strong> $${order.tax.toFixed(2)}</p>
        ${order.discount > 0 ? `<p><strong>Discount:</strong> $${order.discount.toFixed(2)}</p>` : ""}
        <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
        <p>We hope to serve you again in the future.</p>
        <p>Best regards,<br>Your E-commerce Team</p>
      `;
      await sendEmail(
        order.user.email,
        `Order Cancellation - Order #${order._id}`,
        `Your order #${order._id} has been cancelled.`,
        emailHtml
      );
      console.log(`Cancellation email sent to ${order.user.email} for order ${order._id}`);
    } catch (emailError) {
      console.error("Failed to send cancellation email:", {
        message: emailError.message,
        email: order.user.email,
        orderId: order._id,
      });
    }

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Error cancelling order:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to cancel order", details: error.message });
  }
};

module.exports = { createOrder, captureOrder, updateTracking, resendOrderConfirmationEmail, cancelOrder };
