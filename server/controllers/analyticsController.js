const ShopifyOrder = require("../models/Order");
const Customer = require("../models/Customer");

// const checkData = async (req, res) => {
//   const sampleData = await ShopifyOrder.find().limit(1);
//   console.log(sampleData);
// };
// checkData();

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
    console.log(dailyCustomers);
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
const getRepeatCustomers = async (req, res) => {
  try {
    const timeFrames = ["daily", "monthly", "quarterly", "yearly"];

    const pipelines = {
      daily: [
        {
          $project: {
            customerId: "$customer.id",
            created_at: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: {
                  $convert: { input: "$created_at", to: "date", onError: null },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: { customerId: "$customerId", date: "$created_at" },
            orderCount: { $sum: 1 },
          },
        },
        {
          $match: { orderCount: { $gt: 1 } },
        },
        {
          $group: {
            _id: "$_id.customerId",
            orders: { $push: { date: "$_id.date", count: "$orderCount" } },
          },
        },
      ],
      monthly: [
        {
          $project: {
            customerId: "$customer.id",
            month: {
              $dateToString: {
                format: "%Y-%m",
                date: {
                  $convert: { input: "$created_at", to: "date", onError: null },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: { customerId: "$customerId", month: "$month" },
            orderCount: { $sum: 1 },
          },
        },
        {
          $match: { orderCount: { $gt: 1 } },
        },
        {
          $group: {
            _id: "$_id.customerId",
            orders: { $push: { month: "$_id.month", count: "$orderCount" } },
          },
        },
      ],
      quarterly: [
        {
          $project: {
            customerId: "$customer.id",
            year: {
              $dateToString: {
                format: "%Y",
                date: {
                  $convert: { input: "$created_at", to: "date", onError: null },
                },
              },
            },
            quarter: {
              $concat: [
                {
                  $toString: {
                    $ceil: {
                      $divide: [
                        {
                          $month: {
                            $convert: {
                              input: "$created_at",
                              to: "date",
                              onError: null,
                            },
                          },
                        },
                        3,
                      ],
                    },
                  },
                },
                "-Q",
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              customerId: "$customerId",
              year: "$year",
              quarter: "$quarter",
            },
            orderCount: { $sum: 1 },
          },
        },
        {
          $match: { orderCount: { $gt: 1 } },
        },
        {
          $group: {
            _id: "$_id.customerId",
            orders: {
              $push: {
                year: "$_id.year",
                quarter: "$_id.quarter",
                count: "$orderCount",
              },
            },
          },
        },
      ],
      yearly: [
        {
          $project: {
            customerId: "$customer.id",
            year: {
              $dateToString: {
                format: "%Y",
                date: {
                  $convert: { input: "$created_at", to: "date", onError: null },
                },
              },
            },
          },
        },
        {
          $group: {
            _id: { customerId: "$customerId", year: "$year" },
            orderCount: { $sum: 1 },
          },
        },
        {
          $match: { orderCount: { $gt: 1 } },
        },
        {
          $group: {
            _id: "$_id.customerId",
            orders: { $push: { year: "$_id.year", count: "$orderCount" } },
          },
        },
      ],
    };

    const results = await Promise.all(
      timeFrames.map(async (frame) => {
        const data = await ShopifyOrder.aggregate(pipelines[frame]);
        return { timeFrame: frame, data };
      })
    );

    res.json(results);
  } catch (error) {
    console.error("Error fetching repeat customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  try {
    // Aggregate total spending per customer
    const customerSpendings = await ShopifyOrder.aggregate([
      {
        $group: {
          _id: "$customer_id",
          totalSpent: {
            $sum: { $toDouble: "$total_price_set.shop_money.amount" },
          },
        },
      },
    ]);
    // console.log(customerSpendings);
    // Map customer IDs to their total spending
    const spendingsMap = {};
    customerSpendings.forEach((record) => {
      spendingsMap[record._id] = record.totalSpent;
    });
    // console.log(spendingsMap);
    // Aggregate customers by cohort (month of first purchase)
    const customerCLV = await Customer.aggregate([
      {
        $addFields: {
          createdAt: { $dateFromString: { dateString: "$created_at" } },
        },
      },
      {
        $addFields: {
          cohort: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        },
      },
      {
        $lookup: {
          from: "shopifyOrders",
          localField: "_id",
          foreignField: "customer_id",
          as: "orders",
        },
      },
      {
        $addFields: {
          totalSpent: {
            $sum: {
              $map: {
                input: "$orders",
                as: "order",
                in: { $toDouble: "$$order.total_price_set.shop_money.amount" },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: "$cohort",
          totalCLV: { $sum: "$totalSpent" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          cohort: "$_id",
          totalCLV: { $toDouble: "$totalCLV" },
          count: { $toDouble: "$count" },
          averageCLV: {
            $cond: {
              if: { $eq: ["$count", 0] },
              then: 0,
              else: { $divide: ["$totalCLV", "$count"] },
            },
          },
        },
      },
      { $sort: { cohort: 1 } }, // Sort by cohort in ascending order
    ]);

    res.json(customerCLV);
    // console.log(customerCLV);
  } catch (error) {
    console.error("Error fetching customer lifetime value by cohorts:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getTotalSalesOverTime,
  getSalesGrowthRate,
  getNewCustomersOverTime,
  getRepeatCustomers,
  getCustomerDistribution,
  getCustomerLifetimeValue,
};
