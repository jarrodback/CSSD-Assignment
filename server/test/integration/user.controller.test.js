let chai = require("chai");
let chaiHttp = require("chai-http");
const { ListIndexesCursor } = require("mongoose/node_modules/mongodb");
let server = require("../../app");
let should = chai.should();
chai.use(chaiHttp);

let authCookie;
let authCookieSig;

before(function (done) {
    chai.request(server)
        .post("/auth/login")
        .send({
            email: "operator@email.com",
            password: "test1",
        })
        .end((err, res) => {
            authCookie = res.headers["set-cookie"].pop().split(";")[0];
            authCookieSig = res.headers["set-cookie"].pop().split(";")[0];
            done();
        });
});

describe("Testing /user paths", () => {
    it("Should get all users", (done) => {
        // Arrange
        const limit = "10";
        const offset = "0";
        const url = `/user?limit=${limit}&offset=${offset}`;
        // Act
        chai.request(server)
            .get(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .end((err, res) => {
                // Assert
                res.should.have.status(200);
                res.should.be.a("object");

                done();
            });
    });
});

describe("Testing /user paths", () => {
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

    it("Should not get all users", (done) => {
        // Arrange
        const url = "/user/";
        // Act
        chai.request(server)
            .get(url)
            .set("Cookie", authCookie + ";  " + authCookieSig)
            .end((err, res) => {
                // Assert
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.message.should.be.eql(
                    "Unauthorized: You not do have permission to view this page."
                );

                done();
            });
    });
});
