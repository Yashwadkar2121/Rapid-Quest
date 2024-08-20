const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    required: true,
  },
  default_address: {
    city: {
      type: String,
      required: false, // Make city optional
    },
  },
});

const Customer = mongoose.model("Customer", CustomerSchema, "shopifyCustomers");
module.exports = Customer;
