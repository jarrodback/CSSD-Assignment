const UserBusiness = require("../business/user.business");
const userBusiness = new UserBusiness();

/**
 * Get all users
 */
exports.getAllUsers = async (req, res) => {
 userBusiness.findAllUsers(req.query)
   .then((data) => {return res.status(200).send(data)})
   .catch((error) => {
    res.status(error.status).send({message: error.message})
   })
}
