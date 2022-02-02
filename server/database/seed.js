const mongoose = require("mongoose");
mongoose.users = require("../models/user.model")(mongoose);
mongoose.locations = require("../models/location.model")(mongoose);
mongoose.journeys = require("../models/journey.model")(mongoose);
mongoose.bills = require("../models/bill.model")(mongoose);
const bcrypt = require("bcryptjs");
const environment = process.env.NODE_ENV;
let dbConfig = require("../config/db.config.js")[environment] ?? { url: "mongodb://localhost:27017/highwaytrackerdb_testing" };

mongoose
    .connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection to database successful.");
    })
    .catch(() => {
        console.log("Connection to database unsuccessful.");
    });

const users = [
    {
        _id: "123456789107",
        username: "test_username",
        email: "test@email.com",
        password: bcrypt.hashSync("test1", 8),
        type: "Driver",
    },
    {
        _id: "123456789108",
        username: "test_username2",
        email: "test2@email.com",
        password: bcrypt.hashSync("test1", 8),
        type: "Driver",
    },
];

const locations = [
    {
        _id: "123456789101",
        name: "test_location_1",
        coordinates: {
            longitude: 50,
            latitude: 50
        }
    },
    {
        _id: "123456789102",
        name: "test_location_2",
        coordinates: {
            longitude: 0,
            latitude: 0
        }
    }
]

const journeys = [
    {
        _id: "123456789103",
        regNumber: "test_reg_number",
        entryLocation: "123456789101",
        exitLocation: "123456789102",
        journeyDateTime: "2022-02-01T15:50:51.039Z"
    },
    {
        _id: "123456789104",
        regNumber: "test_reg_number2",
        entryLocation: "123456789101",
        exitLocation: "123456789102",
        journeyDateTime: "2022-02-01T15:50:51.038Z"
    },
]

const bills = [
    {
        _id: "123456789105",
        journey: "123456789103",
        driver: "123456789107",
        cost: 5,
        paid: false
    },
    {
        _id: "123456789106",
        journey: "123456789104",
        driver: "123456789108",
        cost: 5,
        paid: true
    }
]

const seedDB = async () => {
    for(const collection in mongoose.connection.collections){
        await mongoose.connection.collections[collection].deleteMany()
    }
    
    await mongoose.users.create(users);
    await mongoose.locations.create(locations);
    await mongoose.journeys.create(journeys);
    await mongoose.bills.create(bills)
};

seedDB()
    .then(() => {
        console.log("Successfully seeded database.");
    })
    .catch((error) => {
        console.log("An error occurred while seeding databases: ", error);
    })
    .finally(() => {
        mongoose.connection.close();
    });
