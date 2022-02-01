// Get database config
const environment = process.env.NODE_ENV;
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const dbConfig = require("../config/db.config.js");
const journey = require("../models/journey")(mongoose)
const bill = require("../models/bill")(mongoose)
const location = require("../models/location")(mongoose)

// Create mongoose and read in config
const db = {journey: journey, bill: bill, location: location};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.mongoose.plugin((schema) => {
    schema.pre("updateOne", setRunValidators);
    schema.pre("findByIdAndUpdate", setRunValidators);
});
function setRunValidators() {
    this.setOptions({ runValidators: true });
}

// Using the mongoose object, start the database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database (" + environment + ")");
    })
    .catch((err) => {
        console.log("Cannot connect to the database.", err);
        process.exit();
    });

module.exports = db;

module.exports = {
    getModel: (modelName) => {
        return db.mongoose.model(modelName);
    },
};
