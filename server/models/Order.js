const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  total_price_set: {
    shop_money: {
      amount: Number,
    },
  },
  created_at: Date,
});

module.exports = mongoose.model("Order", OrderSchema);
