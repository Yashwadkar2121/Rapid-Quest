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
// const checkData = async (req, res) => {
//   const sampleData = await ShopifyOrder.find().limit(1);
//   console.log(sampleData);
// };
// checkData();
// Sales Growth Rate Over Time
const getSalesGrowthRate = async (req, res) => {
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

    // Function to calculate growth rates
    const calculateGrowthRate = (data) => {
      return data
        .map((item, index, array) => {
          if (index === 0) return null; // No previous period to compare

          const previous = array[index - 1];
          const growthRate =
            ((item.totalSales - previous.totalSales) / previous.totalSales) *
            100;

          return {
            ...item,
            growthRate: isFinite(growthRate) ? growthRate.toFixed(2) : 0,
          };
        })
        .slice(1); // Exclude the first entry which has no growth rate
    };

    // Format and calculate growth rates
    res.json({
      dailyGrowthRate: calculateGrowthRate(formatDailySales(dailySales)),
      monthlyGrowthRate: calculateGrowthRate(formatMonthlySales(monthlySales)),
      quarterlyGrowthRate: calculateGrowthRate(
        formatQuarterlySales(quarterlySales)
      ),
      yearlyGrowthRate: calculateGrowthRate(formatYearlySales(yearlySales)),
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
const formatDailyCustomers = (data) => {
  return data.map((entry) => ({
    date: `${entry._id.year}-${String(entry._id.month).padStart(
      2,
      "0"
    )}-${String(entry._id.day).padStart(2, "0")}`,
    newCustomers: entry.newCustomers,
  }));
};

const formatMonthlyCustomers = (data) => {
  return data.map((entry) => ({
    month: `${entry._id.year}-${String(entry._id.month).padStart(2, "0")}`,
    newCustomers: entry.newCustomers,
  }));
};

const formatQuarterlyCustomers = (data) => {
  return data.map((entry) => ({
    year: entry._id.year,
    quarter: entry._id.quarter,
    newCustomers: entry.newCustomers,
  }));
};

const formatYearlyCustomers = (data) => {
  return data.map((entry) => ({
    year: entry._id.year,
    newCustomers: entry.newCustomers,
  }));
};
// New Customers Added Over Time
const getNewCustomersOverTime = async (req, res) => {
  try {
    // Daily new customers aggregation
    const dailyCustomers = await Customer.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" },
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
          newCustomers: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Monthly new customers aggregation
    const monthlyCustomers = await Customer.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
          },
          newCustomers: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Quarterly new customers aggregation
    const quarterlyCustomers = await Customer.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
          },
          newCustomers: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.quarter": 1 } },
    ]);

    // Yearly new customers aggregation
    const yearlyCustomers = await Customer.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" },
          },
        },
      },
      {
        $group: {
          _id: { year: { $year: "$created_at" } },
          newCustomers: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);

    res.json({
      dailyCustomers: formatDailyCustomers(dailyCustomers),
      monthlyCustomers: formatMonthlyCustomers(monthlyCustomers),
      quarterlyCustomers: formatQuarterlyCustomers(quarterlyCustomers),
      yearlyCustomers: formatYearlyCustomers(yearlyCustomers),
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Number of Repeat Customers
const formatDailyRepeatCustomers = (dailyRepeatCustomers) => {
  return dailyRepeatCustomers.map((customer) => ({
    date: `${customer._id.year}-${String(customer._id.month).padStart(
      2,
      "0"
    )}-${String(customer._id.day).padStart(2, "0")}`,
    repeatCustomers: customer.repeatCustomers,
  }));
};

const formatMonthlyRepeatCustomers = (monthlyRepeatCustomers) => {
  return monthlyRepeatCustomers.map((customer) => ({
    month: `${customer._id.year}-${String(customer._id.month).padStart(
      2,
      "0"
    )}`,
    repeatCustomers: customer.repeatCustomers,
  }));
};

const formatQuarterlyRepeatCustomers = (quarterlyRepeatCustomers) => {
  return quarterlyRepeatCustomers.map((customer) => ({
    year: customer._id.year,
    quarter: customer._id.quarter,
    repeatCustomers: customer.repeatCustomers,
  }));
};

const formatYearlyRepeatCustomers = (yearlyRepeatCustomers) => {
  return yearlyRepeatCustomers.map((customer) => ({
    year: customer._id.year,
    repeatCustomers: customer.repeatCustomers,
  }));
};
const getRepeatCustomers = async (req, res) => {
  try {
    // Daily Repeat Customers
    const dailyRepeatCustomers = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" }, // Convert string to Date if necessary
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
            day: { $dayOfMonth: "$created_at" },
            customerId: "$customer_id",
          },
          purchaseCount: { $sum: 1 },
        },
      },
      {
        $match: { purchaseCount: { $gt: 1 } }, // Filter customers with more than one purchase
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
            day: "$_id.day",
          },
          repeatCustomers: { $sum: 1 }, // Count unique repeat customers
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Monthly Repeat Customers
    const monthlyRepeatCustomers = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            month: { $month: "$created_at" },
            customerId: "$customer_id",
          },
          purchaseCount: { $sum: 1 },
        },
      },
      {
        $match: { purchaseCount: { $gt: 1 } },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
          },
          repeatCustomers: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Quarterly Repeat Customers
    const quarterlyRepeatCustomers = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" },
          },
        },
      },
      {
        $addFields: {
          quarter: { $ceil: { $divide: [{ $month: "$created_at" }, 3] } },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            quarter: "$quarter",
            customerId: "$customer_id",
          },
          purchaseCount: { $sum: 1 },
        },
      },
      {
        $match: { purchaseCount: { $gt: 1 } },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            quarter: "$_id.quarter",
          },
          repeatCustomers: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.quarter": 1 } },
    ]);

    // Yearly Repeat Customers
    const yearlyRepeatCustomers = await ShopifyOrder.aggregate([
      {
        $addFields: {
          created_at: {
            $dateFromString: { dateString: "$created_at" },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$created_at" },
            customerId: "$customer_id",
          },
          purchaseCount: { $sum: 1 },
        },
      },
      {
        $match: { purchaseCount: { $gt: 1 } },
      },
      {
        $group: {
          _id: { year: "$_id.year" },
          repeatCustomers: { $sum: 1 }, // Count unique repeat customers
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);

    res.json({
      dailyRepeatCustomers: formatDailyRepeatCustomers(dailyRepeatCustomers),
      monthlyRepeatCustomers: formatMonthlyRepeatCustomers(
        monthlyRepeatCustomers
      ),
      quarterlyRepeatCustomers: formatQuarterlyRepeatCustomers(
        quarterlyRepeatCustomers
      ),
      yearlyRepeatCustomers: formatYearlyRepeatCustomers(yearlyRepeatCustomers),
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Geographical Distribution of Customers
const getCustomerDistribution = async (req, res) => {
  try {
    // Aggregate customer data by city
    const customerDistribution = await Customer.aggregate([
      { $group: { _id: "$default_address.city", count: { $sum: 1 } } },
      { $project: { _id: 0, city: "$_id", count: 1 } },
      { $sort: { count: 1 } }, // Optional: Sort by the count in descending order
    ]);

    // Respond with the aggregated data
    res.json(customerDistribution);
  } catch (error) {
    console.error("Error fetching customer distribution:", error);
    res.status(500).send("Internal Server Error");
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
