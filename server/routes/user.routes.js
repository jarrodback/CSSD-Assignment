const express = require("express");
const router = express.Router();
const { checkJwtToken } = require("../middleware/auth/authJwt");

// Get the Bill controller
const userController = require("../controllers/user.controller");

// Get All Users
router.get("/", checkJwtToken, userController.getAllUsers);

module.exports = router;
