const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

require("./database");
require("dotenv").config();

var app = express();

app.use(
    cookieSession({
        name: "highwayTracker-token",
        secret: process.env.TOKEN_SECRET,
        httpOnly: true,
        keys: [process.env.TOKEN_SECRET],
    })
);

app.use(cors({ origin: "http://localhost:8080", credentials: true }));

/**
 * Router setup
 */
var authRouter = require("./routes/auth.routes");

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
app.use(cookieParser());

// Configuring the main routes
app.use("/auth", authRouter);

module.exports = app;
