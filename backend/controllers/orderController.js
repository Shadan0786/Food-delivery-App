import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import OrderModel from "../models/orderModel.js";

export const placeOrder = async (req, res) => {

  try {

    // Save order in DB
    const newOrder = new OrderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
    });

    await newOrder.save();

    // Razorpay order
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    const order = await razorpay.orders.create(options);
    console.log(process.env.RAZORPAY_KEY_ID);
console.log(process.env.RAZORPAY_KEY_SECRET);
console.log(order);

    res.json({
      success: true,
      order,
      orderId: newOrder._id,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error placing order",
    });
  }
};

export const verifyOrder = async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body.toString())
      .digest("hex");

    const isAuthentic =
      expectedSignature === razorpay_signature;

    if (isAuthentic) {

      await OrderModel.findByIdAndUpdate(
        orderId,
        {
          payment: true,
        }
      );

      res.json({
        success: true,
        message: "Payment Verified",
      });

    } else {

      res.json({
        success: false,
        message: "Payment Failed",
      });
    }

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: "Error",
    });
  }
};