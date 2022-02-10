let chai = require("chai");
const { isOperator } = require("../../middleware/auth/authJwt");
let should = chai.should();
let expect = chai.expect;

describe("Testing auth functions", () => {
    it("Testing isOperator with user Driver", (done) => {
        // Arrange
        let called = false;
        let res = {
            send: function (response) {
                expect(response.message).to.be.equal(
                    "Unauthorized: You not do have permission to view this page."
                );
            },
            status: function () {
                return this;
            },
        };
        let next = function () {
            called = true;
        };

        // Act
        isOperator({ type: "Driver" }, res, next);

        // Assert
        expect(called).to.be.false;

        done();
    });

    it("Testing isOperator with user Toll Operator", (done) => {
        // Arrange
        let called = false;
        let res = {
            send: function (response) {
                expect(response.message).to.be.equal(
                    "Unauthorized: You not do have permission to view this page."
                );
            },
            status: function () {
                return this;
            },
        };
        let next = function () {
            called = true;
        };

        // Act
        isOperator({ type: "Toll Operator" }, res, next);

        // Assert
        expect(called).to.be.true;

        done();
    });
});
