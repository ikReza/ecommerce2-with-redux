const express = require("express");
const router = express.Router();
const { isAuth, isAdmin } = require("../util");

const Order = require("../models/orderModel");

router.get("/", isAuth, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user");
    res.send(orders);
  } catch (err) {
    res.status(402).send({ message: err });
  }
});

router.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get("/:id", isAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.send(order);
  } catch (err) {
    res.status(404).send({ message: "Order Not Found" });
  }
});

router.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    user: req.user._id,
    orderItems: req.body.orderItems,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    tax: req.body.tax,
    totalPrice: req.body.totalPrice,
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(202).send({ message: "New Order Created", data: savedOrder });
  } catch (err) {
    res.status(402).send({ message: err });
  }
});

module.exports = router;
