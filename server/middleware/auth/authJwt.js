const jwt = require("jsonwebtoken");

// Check if token is valid
const checkJwtToken = (req, res, next) => {
    if (!req.session || !req.session.token) {
        return res.status(401).send({
            message: "Unauthorized: No token provided.",
        });
    }
    const token = req.session.token;

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized: Invalid token.",
            });
        }
        req.userId = decoded.id;
        req.username = decoded.username;
        req.email = decoded.email;
        req.type = decoded.type;
        return next();
    });
};
// Check if the active user is an operator
const isOperator = (req, res, next) => {
    const type = req.type;
    if (type !== "Toll Operator") {
        return res.status(403).send({
            message:
                "Unauthorized: You not do have permission to view this page.",
        });
    }
    return next();
};

module.exports = {
    checkJwtToken,
    isOperator,
};
