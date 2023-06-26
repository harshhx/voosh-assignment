const Order = require("../models/order_schema");

module.exports.createOrder = async (req, res) => {
  if (!req.user) {
    res.status(401).json("Please Authenticate");
    return;
  }
  try {
    const { itemName, totalAmount, mobile } = req.body;
    req.body;
    const order = await Order.create({
      itemName,
      totalAmount,
      mobile,
      userId: req.user._id,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports.getAllOrdersForUser = async (req, res) => {
  if (!req.user) {
    res.status(401).json("Please Authenticate");
    return;
  }
  try {
    const allOrders = await Order.find({
      userId: req.user._id,
    });
    res.status(200).json({ allOrders });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
