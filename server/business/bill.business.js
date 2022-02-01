const DataLayer = require("../datalayer/mongo");
const model = require("../database").getModel("bill");
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
   driver: queryString.driver,
   paid: queryString.paid,
   limit: queryString.limit ?? Number.MAX_VALUE,
   offset: queryString.offset ?? 0
  }
  console.log("BUSINESS" + filter)
  return this.dataLayer
      .findAllAndPopulate(filter, { path: 'journey', populate: { path: 'entryLocation exitLocation' }})
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