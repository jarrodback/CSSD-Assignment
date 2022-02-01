const UserBusiness = require("../business/user.business");
const userBusiness = new UserBusiness();

/**
 * Login the user
 */
exports.login = async (req, res) => {
    userBusiness
        .login(req.body.email, req.body.password)
        .then((data) => {
            req.session.token = data.token;
            req.session.username = data.username;
            req.session.role = data.role;
            req.session.id = data.id;

            res.status(200).send({
                message: "Successfully logged in.",
                username: data.username,
                role: data.role,
                id: data.id,
            });
        })
        .catch((error) => {
            res.status(error.status).send({ message: error.message });
        });
};

/**
 * Register the user
 */
exports.register = (req, res) => {
    userBusiness
        .register(req.body)
        .then(() => {
            res.status(201).send({
                message: "User was successfully created.",
            });
        })
        .catch((error) => {
            res.status(error.status).send({ message: error.message });
        });
};

/**
 * Logs the user out
 */
exports.logout = (req, res) => {
    req.session = null;
    res.status(200).send({
        message: "User was successfully logged out.",
    });
};
