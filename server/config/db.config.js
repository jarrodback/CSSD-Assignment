module.exports = {
    dev: {
        url: "mongodb://localhost:27017/highwaytrackerdb",
    },
    test: {
        url: "mongodb://localhost:27017/highwaytrackerdb_testing",
    },
    production: {
        url: process.env.MONGODB_URI,
    },
};
