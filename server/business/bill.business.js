const DataLayer = require("../datalayer/mongo");
const model = require("../database").getModel("bill");
const httpError = require("http-errors");
const Utilities = require('../utilities')

module.exports = class BillBusiness {
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
   limit: queryString.limit ?? 10,
   offset: queryString.offset ?? 0
  }
  return this.dataLayer
    .findAllAndPopulate(filter, [{ path: 'journey', populate: { path: 'entryLocation exitLocation' }}, {path: 'driver', select: 'username type email'}])
    .catch((error) => { 
     throw httpError(500, error.message)})
 }

 /**
  *  Get bill by ID.
  */
 async getBillById(billId) {
  return this.dataLayer
    .findByPropertyAndPopulate(billId, [{path: 'journey', populate: {path: 'entryLocation exitLocation'}}, {path: 'driver', select: 'username type email'}])
    .catch((error) => {
     throw httpError(500, error.message)
    })
 }

 /**
  *  Pay a bill by ID.
  */
 async payBill(id) {
  const record = {
   paid: true
  }
  return this.dataLayer.update(Utilities.convertToObjectId(id), record)
    .catch((error) => {throw httpError(404, error.message)
  })
 }
}