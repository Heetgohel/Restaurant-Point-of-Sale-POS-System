const mongoose = require("mongoose");

const OrderHistorySchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true
  },
  items: [
    {
      name: String,
      itemPrice: Number,
      quantity: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Online"],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("OrderHistory", OrderHistorySchema);
