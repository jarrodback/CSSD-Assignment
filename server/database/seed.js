const mongoose = require("mongoose");
mongoose.users = require("../models/user.model")(mongoose);
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
        password: bcrypt.hashSync("admin", 8),
        type: "Driver",
    },
];
const seedDB = async () => {
    await mongoose.users.deleteMany();
    await mongoose.users.insertMany(users);
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
