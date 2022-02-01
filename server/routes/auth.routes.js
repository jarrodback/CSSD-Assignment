const express = require("express");
const router = express.Router();

// Get the Auth controller
const authController = require("../controllers/auth.controller");

// Log the user in
router.post("/login/", authController.login);

// Register the user
router.post("/register/", authController.register);

// Log the user out
router.post("/logout/", authController.logout);

module.exports = router;
