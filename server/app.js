const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json')

require("./database");
require("dotenv").config();

const app = express();

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
const authRouter = require("./routes/auth.routes");
const billRouter = require("./routes/bill.routes");
app.get('/api-docs/swagger.json', (req, res) => res.json(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

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
app.use("/bill", billRouter)

module.exports = app;
