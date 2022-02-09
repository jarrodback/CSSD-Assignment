let chai = require("chai");
let should = chai.should();
const Utilities = require("../../utilities")
const objectId = require("mongoose").Types.ObjectId

describe("Testing utilities functions", () => {
 it("Calculate cost based on distance travelled", (done) => {
  // Arrange
  const location1 = {
   name: "test_location1",
   coordinates: {
    longitude: 0,
    latitude: 0
   }
  }
  const location2 = {
   name: "test_location2",
   coordinates: {
    longitude: 50,
    latitude: 50
   }
  }
  const journey = {
   entryLocation: location1,
   exitLocation: location2
  }
  
  // Act
  const cost = Utilities.calculateCost(journey)

  // Assert
  cost.should.equal(72.93887106726764)
  done();
 })

 it("Testing convertObjectID", (done) => {
    // Arrange
    const id = '123456789101';

    // Act
    const result = Utilities.convertToObjectId(id);

    // Assert
    result.should.be.eql(objectId(id));
    done();
 })

})