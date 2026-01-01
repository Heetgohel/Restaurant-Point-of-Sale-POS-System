const express = require("express");
const router = express.Router();
const OrderHistory = require("../models/OrderHistory");

// POST /orderhistory/add
router.post("/add", async (req, res) => {
  try {
    const newOrder = new OrderHistory(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order saved to history." });
  } catch (err) {
    console.error("Failed to save order history:", err);
    res.status(500).json({ error: "Failed to save order history." });
  }
});

// Optional: GET history
router.get("/all", async (req, res) => {
  try {
    const history = await OrderHistory.find().sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order history." });
  }
});

module.exports = router;
