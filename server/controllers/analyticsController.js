const ShopifyOrder = require("../models/Order");
const Customer = require("../models/Customer");

// Total Sales Over Time
const formatDailySales = (dailySales) => {
  return dailySales.map((sale) => ({
    date: `${sale._id.year}-${String(sale._id.month).padStart(2, "0")}-${String(
      sale._id.day
    ).padStart(2, "0")}`,
    totalSales: sale.totalSales,
  }));
};
const formatMonthlySales = (monthlySales) => {
  return monthlySales.map((sale) => ({
    month: `${sale._id.year}-${String(sale._id.month).padStart(2, "0")}`,
    totalSales: sale.totalSales,
  }));
};
const formatQuarterlySales = (quarterlySales) => {
  return quarterlySales.map((sale) => ({
    year: sale._id.year,
    quarter: sale._id.quarter,
    totalSales: sale.totalSales,
  }));
};
const formatYearlySales = (yearlySales) => {
  return yearlySales.map((sale) => ({
    year: sale._id.year,
    totalSales: sale.totalSales,
  }));
};
const getTotalSalesOverTime = async (req, res) => {
  try {
    // Daily sales aggregation
    const dailySales = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: { $dateFromString: { dateString: "$created_at" } },
          totalPrice: {
            $ifNull: [{ $toDouble: "$total_price_set.shop_money.amount" }, 0],
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
            day: { $dayOfMonth: "$created_at" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Monthly sales aggregation
    const monthlySales = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: { $dateFromString: { dateString: "$created_at" } },
          totalPrice: {
            $ifNull: [{ $toDouble: "$total_price_set.shop_money.amount" }, 0],
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Quarterly sales aggregation
    const quarterlySales = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: { $dateFromString: { dateString: "$created_at" } },
          totalPrice: {
            $ifNull: [{ $toDouble: "$total_price_set.shop_money.amount" }, 0],
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id.year": 1, "_id.quarter": 1 } },
    ]);

    // Yearly sales aggregation
    const yearlySales = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: { $dateFromString: { dateString: "$created_at" } },
          totalPrice: {
            $ifNull: [{ $toDouble: "$total_price_set.shop_money.amount" }, 0],
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: "$created_at" } },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);

    res.json({
      dailySales: formatDailySales(dailySales),
      monthlySales: formatMonthlySales(monthlySales),
      quarterlySales: formatQuarterlySales(quarterlySales),
      yearlySales: formatYearlySales(yearlySales),
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Sales Growth Rate Over Time
const getSalesGrowthRate = async (req, res) => {
  // Implement similar to getTotalSalesOverTime
};

// New Customers Added Over Time
const getNewCustomersOverTime = async (req, res) => {
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
const getRepeatCustomers = async (req, res) => {
  // Implement based on the logic for repeat purchases
};

// Geographical Distribution of Customers
const getCustomerDistribution = async (req, res) => {
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
const getCustomerLifetimeValue = async (req, res) => {
  // Implement similar to other aggregations
};

module.exports = {
  getTotalSalesOverTime,
  getSalesGrowthRate,
  getNewCustomersOverTime,
  getRepeatCustomers,
  getCustomerDistribution,
  getCustomerLifetimeValue,
};
