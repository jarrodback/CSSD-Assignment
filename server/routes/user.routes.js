const express = require("express");
const router = express.Router();
const { checkJwtToken, isOperator } = require("../middleware/auth/authJwt");

// Get the user controller
const userController = require("../controllers/user.controller");

// Get All Users
router.get("/", checkJwtToken, isOperator, userController.getAllUsers);

module.exports = router;
