const Order = require("../models/Order");
const Customer = require("../models/Customer");

// Total Sales Over Time
exports.getTotalSalesOverTime = async (req, res) => {
  try {
    const sales = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
            day: { $dayOfMonth: "$created_at" },
          },
          totalSales: { $sum: "$total_price_set.shop_money.amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Sales Growth Rate Over Time
exports.getSalesGrowthRate = async (req, res) => {
  // Implement similar to getTotalSalesOverTime
};

// New Customers Added Over Time
exports.getNewCustomersOverTime = async (req, res) => {
  try {
    const customers = await Customer.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
            day: { $dayOfMonth: "$created_at" },
          },
          newCustomers: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Number of Repeat Customers
exports.getRepeatCustomers = async (req, res) => {
  // Implement based on the logic for repeat purchases
};

// Geographical Distribution of Customers
exports.getCustomerDistribution = async (req, res) => {
  try {
    const distribution = await Customer.aggregate([
      {
        $group: {
          _id: "$default_address.city",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Customer Lifetime Value by Cohorts
exports.getCustomerLifetimeValue = async (req, res) => {
  // Implement similar to other aggregations
};
