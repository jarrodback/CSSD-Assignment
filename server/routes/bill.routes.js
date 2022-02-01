const express = require("express");
const router = express.Router();

// Get the Bill controller
const billController = require("../controllers/bill.controller");

// Get All Bills
router.get("/", billController.getAllBills);

// Pay for bill
router.put("/:id", billController.payBill);

module.exports = router;
