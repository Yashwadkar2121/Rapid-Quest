const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.get("/sales-over-time", analyticsController.getTotalSalesOverTime);
router.get("/sales-growth-rate", analyticsController.getSalesGrowthRate);
router.get("/new-customers", analyticsController.getNewCustomersOverTime);
router.get("/repeat-customers", analyticsController.getRepeatCustomers);
router.get(
  "/customer-distribution",
  analyticsController.getCustomerDistribution
);
router.get(
  "/customer-lifetime-value",
  analyticsController.getCustomerLifetimeValue
);

module.exports = router;
