let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../app");
let should = chai.should();
chai.use(chaiHttp);

describe("Testing /auth paths", () => {
    it("user should be able to register", (done) => {
        // Arrange
        const request = {
            email: "test@test.com",
            password: "test1",
            username: "arealusername",
        };

        // Act
        chai.request(server)
            .post("/auth/register")
            .send(request)
            .end((err, res) => {
                // Assert
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("message");
                res.body.message.should.be.eql(
                    "User was successfully created."
                );

                done();
            });
    });

    it("user should be able to login", (done) => {
        // Arrange
        const request = {
            email: "test@test.com",
            password: "test1",
        };

        // Act
        chai.request(server)
            .post("/auth/login")
            .send(request)
            .end((err, res) => {
                // Assert
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("message");
                res.body.message.should.be.eql("Successfully logged in.");
                res.should.have.cookie("highwayTracker-token");

                done();
            });
    });

    it("user shouldn't be able to login with invalid credentials", (done) => {
        // Act
        const request = {
            email: "test@test.com",
            password: "test2",
        };

        // Arrange
        chai.request(server)
            .post("/auth/login")
            .send(request)
            .end((err, res) => {
                // Assert
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("message");
                res.body.message.should.be.eql(
                    "Your email or password is incorrect."
                );

                done();
            });
    });

    it("user shouldn't be able to register with duplicate username", (done) => {
        // Act
        const request = {
            email: "test@realemail.com",
            password: "test1",
            username: "test_username",
        };

        // Arrange
        chai.request(server)
            .post("/auth/register")
            .send(request)
            .end((err, res) => {
                // Assert
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("message");
                res.body.message.should.be.eql("Username is already in use.");

                done();
            });
    });

    it("user shouldn't be able to register with duplicate email", (done) => {
        // Act
        const request = {
            email: "test@email.com",
            password: "test1",
            username: "a username",
        };

        // Arrange
        chai.request(server)
            .post("/auth/register")
            .send(request)
            .end((err, res) => {
                // Assert
                res.should.have.status(400);
                res.should.be.a("object");
                res.body.should.have.property("message");
                res.body.message.should.be.eql("Email is already in use.");

                done();
            });
    });
});
