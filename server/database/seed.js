const mongoose = require("mongoose");
mongoose.users = require("../models/user.model")(mongoose);
mongoose.locations = require("../models/location")(mongoose);
mongoose.journeys = require("../models/journey")(mongoose);
mongoose.bills = require("../models/bill")(mongoose);
const bcrypt = require("bcryptjs");

mongoose
    .connect("mongodb://localhost:27017/highwaytrackerdb_testing", {
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
        username: "test_username",
        email: "test@email.com",
        password: bcrypt.hashSync("test1", 8),
        type: "Driver",
    },
];

const locations = [
    {
        _id: "123456789101",
        name: "test_location_1",
        coordinates: {
            longitude: 10,
            latitude: 10
        }
    },
    {
        _id: "123456789102",
        name: "test_location_2",
        coordinates: {
            longitude: 10,
            latitude: 10
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
        driver: "test_driver",
        cost: 5,
        paid: false
    },
    {
        _id: "123456789106",
        journey: "123456789104",
        driver: "test_driver2",
        cost: 5,
        paid: true
    }
]

const seedDB = async () => {
    for(const collection in mongoose.connection.collections){
        await mongoose.connection.collections[collection].deleteMany()
    }
    
    await mongoose.users.insertMany(users);
    await mongoose.locations.insertMany(locations);
    await mongoose.journeys.insertMany(journeys);
    await mongoose.bills.insertMany(bills)
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
