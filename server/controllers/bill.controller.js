const BillBusiness = require("../business/bill.business");
const billBusiness = new BillBusiness();

/**
 * Get all bills
 */
exports.getAllBills = async (req, res) => {
 console.log("CONTROLLER")
 billBusiness.getAllBills(req.query)
   .then((data) => {
    console.log(data)
    return res.status(200).send(data)})
}

/**
 * Pay bill
 */
exports.payBill = async (req, res) => {
 billBusiness.payBill(req.params.id)
   .then(() => {res.status(200).send({message: "Bill paid."})})
   .catch((error) => {res.status(error.status).send({message: error.message})})
}