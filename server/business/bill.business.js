const DataLayer = require("../datalayer/mongo");
const model = require("../database").getModel("user");
const httpError = require("http-errors");

module.exports = class billBusiness {
 constructor() {
  // Create an instance of the data layer.
  this.dataLayer = new DataLayer(model);
 }

 /**
  *  Get all bills.
  */
 async getAllBills(queryString) {
  const filter = {
   driverId: queryString.driverId,
   paid: queryString.paid,
   limit: queryString.limit ?? Number.MAX_VALUE,
   offset: queryString.offset ?? 0
  }
  return this.dataLayer
      .findAllAndPopulate(filter, { path: 'journey', populate: { path: 'location' }})
      .catch((error) => { throw httpError(404, error.message)})
 }

 /**
  *  Get a bill by ID.
  */
 async payBill(id) {
  const record = {
   paid: true
  }
  return this.dataLayer.update(id, record)
    .catch((error) => {throw httpError(404, error.message)
  })
 }
}