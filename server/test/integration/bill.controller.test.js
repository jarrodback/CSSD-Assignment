let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../app");
let should = chai.should();
chai.use(chaiHttp);

describe("Testing /bill paths", () => {
 it("Should get all bills", (done) => {
  // Arrange
  const url = "/bill/"
  
  // Act
  chai.request(server)
    .get(url)
    .send()
    .end((err, res) => {
     // Assert
     res.should.have.status(200);
     res.should.be.a("object");
     res.body.should.have.lengthOf(2);
     res.body[0].should.haveOwnProperty('cost', 5)
     res.body[0].should.haveOwnProperty('driver', 'test_driver')
     res.body[0].should.haveOwnProperty('paid', false)
     res.body[0].journey.should.haveOwnProperty('regNumber', 'test_reg_number')
     res.body[0].journey.should.haveOwnProperty('journeyDateTime', '2022-02-01T15:50:51.039Z')
     res.body[0].journey.entryLocation.should.haveOwnProperty('name', 'test_location_1')
     res.body[0].journey.entryLocation.coordinates.should.haveOwnProperty('longitude', 10)
     res.body[0].journey.entryLocation.coordinates.should.haveOwnProperty('latitude', 10)
     res.body[0].journey.exitLocation.should.haveOwnProperty('name', 'test_location_2')
     res.body[0].journey.exitLocation.coordinates.should.haveOwnProperty('longitude', 10)
     res.body[0].journey.exitLocation.coordinates.should.haveOwnProperty('latitude', 10)

     done();
    })
 })

 it("Should get all bills which match the driver ID", (done) => {
  // Arrange
  const driverId = "test_driver"
  const url = `/bill?driver=${driverId}`
  
  // Act
  chai.request(server)
    .get(url)
    .send()
    .end((err, res) => {
     // Assert
     res.should.have.status(200);
     res.should.be.a("object");
     res.body.should.have.lengthOf(1);
     res.body[0].should.haveOwnProperty('cost', 5)
     res.body[0].should.haveOwnProperty('driver', 'test_driver')
     res.body[0].should.haveOwnProperty('paid', false)
     res.body[0].journey.should.haveOwnProperty('regNumber', 'test_reg_number')
     res.body[0].journey.should.haveOwnProperty('journeyDateTime', '2022-02-01T15:50:51.039Z')
     res.body[0].journey.entryLocation.should.haveOwnProperty('name', 'test_location_1')
     res.body[0].journey.entryLocation.coordinates.should.haveOwnProperty('longitude', 10)
     res.body[0].journey.entryLocation.coordinates.should.haveOwnProperty('latitude', 10)
     res.body[0].journey.exitLocation.should.haveOwnProperty('name', 'test_location_2')
     res.body[0].journey.exitLocation.coordinates.should.haveOwnProperty('longitude', 10)
     res.body[0].journey.exitLocation.coordinates.should.haveOwnProperty('latitude', 10)

     done();
    })
 })

 it("Should get all bills which match the paid", (done) => {
  // Arrange
  const paid = true
  const url = `/bill?paid=${paid}`
  
  // Act
  chai.request(server)
    .get(url)
    .send()
    .end((err, res) => {
     // Assert
     res.should.have.status(200);
     res.should.be.a("object");
     res.body.should.have.lengthOf(1);
     res.body[0].should.haveOwnProperty('cost', 5)
     res.body[0].should.haveOwnProperty('driver', 'test_driver2')
     res.body[0].should.haveOwnProperty('paid', true)
     res.body[0].journey.should.haveOwnProperty('regNumber', 'test_reg_number2')
     res.body[0].journey.should.haveOwnProperty('journeyDateTime', '2022-02-01T15:50:51.038Z')
     res.body[0].journey.entryLocation.should.haveOwnProperty('name', 'test_location_1')
     res.body[0].journey.entryLocation.coordinates.should.haveOwnProperty('longitude', 10)
     res.body[0].journey.entryLocation.coordinates.should.haveOwnProperty('latitude', 10)
     res.body[0].journey.exitLocation.should.haveOwnProperty('name', 'test_location_2')
     res.body[0].journey.exitLocation.coordinates.should.haveOwnProperty('longitude', 10)
     res.body[0].journey.exitLocation.coordinates.should.haveOwnProperty('latitude', 10)

     done();
    })
 })

 it("Should get one bill when pagination limit is one", (done) => {
  // Arrange
  const limit = 1
  const url = `/bill?limit=${limit}`

  // Act
  chai.request(server)
    .get(url)
    .send()
    .end((err, res) => {
     // Assert
     res.should.have.status(200);
     res.should.be.a("object");
     res.body.should.have.lengthOf(1);
     res.body[0].should.haveOwnProperty('cost', 5)
     res.body[0].should.haveOwnProperty('driver', 'test_driver')
     res.body[0].should.haveOwnProperty('paid', false)
     res.body[0].journey.should.haveOwnProperty('regNumber', 'test_reg_number')
     res.body[0].journey.should.haveOwnProperty('journeyDateTime', '2022-02-01T15:50:51.039Z')
     res.body[0].journey.entryLocation.should.haveOwnProperty('name', 'test_location_1')
     res.body[0].journey.entryLocation.coordinates.should.haveOwnProperty('longitude', 10)
     res.body[0].journey.entryLocation.coordinates.should.haveOwnProperty('latitude', 10)
     res.body[0].journey.exitLocation.should.haveOwnProperty('name', 'test_location_2')
     res.body[0].journey.exitLocation.coordinates.should.haveOwnProperty('longitude', 10)
     res.body[0].journey.exitLocation.coordinates.should.haveOwnProperty('latitude', 10)

     done();
    })
 })

 it("Should get no bills when pagination offset is one", (done) => {
  // Arrange
  const offset = 1
  const url = `/bill?offset=${offset}`
  console.log("ARRANGE")
  // Act
  chai.request(server)
    .get(url)
    .send()
    .end((err, res) => {
     // Assert
     console.log("ASSERT" + res.body)

     res.should.have.status(200);
     res.should.be.a("object");
     res.body.should.have.lengthOf(0);

     done();
    })
 })
 
 it("Should update paid to true", (done) => {
  // Arrange
  const requestBody = {
   paid: true
  }
  const url = `/bill/123456789105`

  // Act
  chai.request(server)
    .put(url)
    .send(requestBody)
    .end((err, res) => {
     // Assert
     res.should.have.status(200);
     res.should.be.a("object");
     res.body.message.should.be.eql("Bill paid.");

     done();
    })
 })

 it("Should throw error if bill doesnt exist", (done) => {
  // Arrange
  const fakeId = '111111111111'
  const requestBody = {
   paid: true
  }
  const url = `/bill/${fakeId}`

  // Act
  chai.request(server)
    .put(url)
    .send(requestBody)
    .end((err, res) => {
     // Assert
     res.should.have.status(404);
     res.body.message.should.be.eql("Bill can't be found in the database.");

     done();
    })
 })

})