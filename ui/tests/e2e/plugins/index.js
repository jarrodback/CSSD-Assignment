module.exports = (on, config) => {
    return Object.assign({}, config, {
        fixturesFolder: "tests/e2e/fixtures",
        integrationFolder: "tests/e2e/tests",
        screenshotsFolder: "tests/e2e/screenshots",
        videosFolder: "tests/e2e/videos",
    });
};
