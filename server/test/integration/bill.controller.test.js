let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../app");
let should = chai.should();
chai.use(chaiHttp);

let authCookie;
let authCookieSig;
before(function (done) {
    chai.request(server)
        .post("/auth/login")
        .send({
            email: "test@email.com",
            password: "test1",
        })
        .end((err, res) => {
            authCookie = res.headers["set-cookie"].pop().split(";")[0];
            authCookieSig = res.headers["set-cookie"].pop().split(";")[0];

            done();
        });
});

describe("Testing /bill paths", () => {
    it("Should get all bills", (done) => {
        // Arrange
        const url = "/bill/";

        // Act
        chai.request(server)
            .get(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .send()
            .end((err, res) => {
                // Assert
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.bills.should.have.lengthOf(2);
                res.body.bills[0].should.haveOwnProperty(
                    "cost",
                    72.93887106726764
                );
                res.body.bills[0].should.haveOwnProperty("paid", false);
                res.body.bills[0].driver.should.haveOwnProperty(
                    "username",
                    "test_username"
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "email",
                    "test@email.com"
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "type",
                    "Driver"
                );
                res.body.bills[0].journey.should.haveOwnProperty(
                    "regNumber",
                    "test_reg_number"
                );
                res.body.bills[0].journey.should.haveOwnProperty(
                    "journeyDateTime",
                    "2022-02-01T15:50:51.039Z"
                );
                res.body.bills[0].journey.entryLocation.should.haveOwnProperty(
                    "name",
                    "test_location_1"
                );
                res.body.bills[0].journey.entryLocation.coordinates.should.haveOwnProperty(
                    "longitude",
                    50
                );
                res.body.bills[0].journey.entryLocation.coordinates.should.haveOwnProperty(
                    "latitude",
                    50
                );
                res.body.bills[0].journey.exitLocation.should.haveOwnProperty(
                    "name",
                    "test_location_2"
                );
                res.body.bills[0].journey.exitLocation.coordinates.should.haveOwnProperty(
                    "longitude",
                    0
                );
                res.body.bills[0].journey.exitLocation.coordinates.should.haveOwnProperty(
                    "latitude",
                    0
                );
                res.body.count.should.equal(2);

                done();
            });
    });

    it("Should get all bills which match the driver ID", (done) => {
        // Arrange
        const driverId = "123456789107";
        const url = `/bill?driver=${driverId}`;

        // Act
        chai.request(server)
            .get(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .send()
            .end((err, res) => {
                // Assert

                res.should.have.status(200);
                res.should.be.a("object");
                res.body.bills.should.have.lengthOf(1);
                res.body.bills[0].should.haveOwnProperty(
                    "cost",
                    72.93887106726764
                );
                res.body.bills[0].should.haveOwnProperty("paid", false);
                res.body.bills[0].driver.should.haveOwnProperty(
                    "username",
                    "test_username"
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "email",
                    "test@email.com"
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "type",
                    "Driver"
                );
                res.body.bills[0].journey.should.haveOwnProperty(
                    "regNumber",
                    "test_reg_number"
                );
                res.body.bills[0].journey.should.haveOwnProperty(
                    "journeyDateTime",
                    "2022-02-01T15:50:51.039Z"
                );
                res.body.bills[0].journey.entryLocation.should.haveOwnProperty(
                    "name",
                    "test_location_1"
                );
                res.body.bills[0].journey.entryLocation.coordinates.should.haveOwnProperty(
                    "longitude",
                    50
                );
                res.body.bills[0].journey.entryLocation.coordinates.should.haveOwnProperty(
                    "latitude",
                    50
                );
                res.body.bills[0].journey.exitLocation.should.haveOwnProperty(
                    "name",
                    "test_location_2"
                );
                res.body.bills[0].journey.exitLocation.coordinates.should.haveOwnProperty(
                    "longitude",
                    0
                );
                res.body.bills[0].journey.exitLocation.coordinates.should.haveOwnProperty(
                    "latitude",
                    0
                );
                res.body.count.should.equal(2);

                done();
            });
    });

    it("Should get all bills which match the paid", (done) => {
        // Arrange
        const paid = true;
        const url = `/bill?paid=${paid}`;

        // Act
        chai.request(server)
            .get(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .send()
            .end((err, res) => {
                // Assert

                res.should.have.status(200);
                res.should.be.a("object");
                res.body.bills.should.have.lengthOf(1);
                res.body.bills[0].should.haveOwnProperty(
                    "cost",
                    72.93887106726764
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "username",
                    "test_username2"
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "email",
                    "test2@email.com"
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "type",
                    "Driver"
                );
                res.body.bills[0].should.haveOwnProperty("paid", true);
                res.body.bills[0].journey.should.haveOwnProperty(
                    "regNumber",
                    "test_reg_number2"
                );
                res.body.bills[0].journey.should.haveOwnProperty(
                    "journeyDateTime",
                    "2022-02-01T15:50:51.038Z"
                );
                res.body.bills[0].journey.entryLocation.should.haveOwnProperty(
                    "name",
                    "test_location_1"
                );
                res.body.bills[0].journey.entryLocation.coordinates.should.haveOwnProperty(
                    "longitude",
                    50
                );
                res.body.bills[0].journey.entryLocation.coordinates.should.haveOwnProperty(
                    "latitude",
                    50
                );
                res.body.bills[0].journey.exitLocation.should.haveOwnProperty(
                    "name",
                    "test_location_2"
                );
                res.body.bills[0].journey.exitLocation.coordinates.should.haveOwnProperty(
                    "longitude",
                    0
                );
                res.body.bills[0].journey.exitLocation.coordinates.should.haveOwnProperty(
                    "latitude",
                    0
                );
                res.body.count.should.equal(2);

                done();
            });
    });

    it("Should get one bill when pagination limit is one", (done) => {
        // Arrange
        const limit = 1;
        const url = `/bill?limit=${limit}`;

        // Act
        chai.request(server)
            .get(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .send()
            .end((err, res) => {
                // Assert
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.bills.should.have.lengthOf(1);
                res.body.bills[0].should.haveOwnProperty(
                    "cost",
                    72.93887106726764
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "username",
                    "test_username"
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "email",
                    "test@email.com"
                );
                res.body.bills[0].driver.should.haveOwnProperty(
                    "type",
                    "Driver"
                );
                res.body.bills[0].should.haveOwnProperty("paid", false);
                res.body.bills[0].journey.should.haveOwnProperty(
                    "regNumber",
                    "test_reg_number"
                );
                res.body.bills[0].journey.should.haveOwnProperty(
                    "journeyDateTime",
                    "2022-02-01T15:50:51.039Z"
                );
                res.body.bills[0].journey.entryLocation.should.haveOwnProperty(
                    "name",
                    "test_location_1"
                );
                res.body.bills[0].journey.entryLocation.coordinates.should.haveOwnProperty(
                    "longitude",
                    50
                );
                res.body.bills[0].journey.entryLocation.coordinates.should.haveOwnProperty(
                    "latitude",
                    50
                );
                res.body.bills[0].journey.exitLocation.should.haveOwnProperty(
                    "name",
                    "test_location_2"
                );
                res.body.bills[0].journey.exitLocation.coordinates.should.haveOwnProperty(
                    "longitude",
                    0
                );
                res.body.bills[0].journey.exitLocation.coordinates.should.haveOwnProperty(
                    "latitude",
                    0
                );
                res.body.count.should.equal(2);

                done();
            });
    });

    it("Should get no bills when pagination offset is one", (done) => {
        // Arrange
        const offset = 1;
        const url = `/bill?offset=${offset}`;

        // Act
        chai.request(server)
            .get(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .send()
            .end((err, res) => {
                // Assert

                res.should.have.status(200);
                res.should.be.a("object");
                res.body.bills.should.have.lengthOf(0);
                res.body.count.should.equal(2);

                done();
            });
    });

    it("Should update paid to true", (done) => {
        // Arrange
        const requestBody = {
            paid: true,
        };
        const url = `/bill/123456789105`;

        // Act
        chai.request(server)
            .put(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .send(requestBody)
            .end((err, res) => {
                // Assert
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.message.should.be.eql("Bill paid.");

                done();
            });
    });

    it("Should throw error if bill doesnt exist", (done) => {
        // Arrange
        const fakeId = "111111111111";
        const requestBody = {
            paid: true,
        };
        const url = `/bill/${fakeId}`;

        // Act
        chai.request(server)
            .put(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .send(requestBody)
            .end((err, res) => {
                // Assert
                res.should.have.status(404);
                res.body.message.should.be.eql(
                    "Bill can't be found in the database."
                );

                done();
            });
    });
});
