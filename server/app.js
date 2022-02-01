const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

require("./database");
require("dotenv").config();

var app = express();

app.use(cors({ origin: "http://localhost:8080", credentials: true }));

/**
 * Router setup
 */

/**
 * View Engine setup
 */
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Configuring the main routes

module.exports = app;
