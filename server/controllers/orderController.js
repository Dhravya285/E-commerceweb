
const Order = require("../models/Order");
const { sendEmail } = require("../utils/sendEmail");
const discountController = require("./discountController");

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied. Admin privileges required." });
    }
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to fetch all orders" });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      user,
      items,
      paymentMethod,
      shippingMethod,
      subtotal,
      discount = 0,
      shipping,
      tax,
      total,
      couponCode,
    } = req.body;

    if (
      !user ||
      !items ||
      !paymentMethod ||
      !shippingMethod ||
      subtotal === undefined ||
      shipping === undefined ||
      tax === undefined ||
      total === undefined
    ) {
      return res.status(400).json({
        error: "Missing required fields",
        details: { user, items, paymentMethod, shippingMethod, subtotal, discount, shipping, tax, total },
      });
    }
    if (!items.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.address ||
      !user.city ||
      !user.state ||
      !user.zipCode
    ) {
      return res.status(400).json({ error: "Missing required user fields" });
    }
    if (total <= 0 || isNaN(total)) {
      return res.status(400).json({ error: "Invalid total amount" });
    }
    if (!["standard", "express"].includes(shippingMethod)) {
      return res.status(400).json({ error: "Invalid shipping method" });
    }
    if (!["cod", "paypal"].includes(paymentMethod)) {
      return res.status(400).json({ error: "Invalid payment method" });
    }
    for (const item of items) {
      if (!item.id || !item.name || !item.price || !item.quantity) {
        return res.status(400).json({ error: `Invalid cart item: ${JSON.stringify(item)}` });
      }
    }

    const order = new Order({
      user: {
        userId: req.user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || "",
        address: user.address,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
      },
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size || "",
        color: item.color || "",
        image: item.image || "",
      })),
      paymentMethod,
      paypalOrderId: null,
      paypalTransactionId: null,
      paymentStatus: paymentMethod === "cod" ? "pending" : "pending",
      shippingMethod,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      orderStatus: "processing",
      trackingNumber: null,
      isDelivered: false,
      couponCode: couponCode || null,
    });

    await order.save();
    console.log(`Order saved with ID: ${order._id}`);

    if (paymentMethod === "cod") {
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
        console.error("Failed to send email after creating COD order:", {
          message: emailError.message,
          email: order.user.email,
          orderId: order._id,
        });
      }
    }

    res.status(200).json({ orderId: order._id });
  } catch (error) {
    console.error("Error creating order:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Failed to create order", details: error.message });
  }
};

module.exports = { getOrders, getAllOrders, createOrder };
