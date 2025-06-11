const axios = require("axios");

const getAccessToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString("base64");
    const { data } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data.access_token;
  } catch (error) {
    console.error("Error getting PayPal access token:", error.response?.data);
    throw new Error("Failed to authenticate with PayPal");
  }
};

const createPaypalOrderId = async (orderData) => {
  try {
    const accessToken = await getAccessToken();
    const { data } = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("PayPal Order Creation Response:", JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    console.error("PayPal order creation error:", error.response?.data);
    throw error;
  }
};
const capturePaypalOrder = async (orderID) => {
  try {
    const accessToken = await getAccessToken();
    const { data } = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error("PayPal order capture error:", error.response?.data);
    throw error;
  }
};

module.exports = { createPaypalOrderId, capturePaypalOrder };