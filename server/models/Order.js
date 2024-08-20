const mongoose = require("mongoose");

// Define the schema for shopifyOrders collection
const ShopifyOrderSchema = new mongoose.Schema({
  total_price_set: {
    shop_money: {
      amount: Number,
    },
  },
  created_at: Date,
});

// Create the model from the schema
const ShopifyOrder = mongoose.model(
  "ShopifyOrder",
  ShopifyOrderSchema,
  "shopifyOrders"
);

module.exports = ShopifyOrder;
