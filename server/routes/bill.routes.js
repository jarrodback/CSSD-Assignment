const express = require("express");
const router = express.Router();
const { checkJwtToken } = require("../middleware/auth/authJwt");

// Get the Bill controller
const billController = require("../controllers/bill.controller");

// Get All Bills
router.get("/", checkJwtToken, billController.getAllBills);

// Pay for bill
router.put("/:id", checkJwtToken, billController.payBill);

module.exports = router;
