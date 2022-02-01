const DataLayer = require("../datalayer/mongo");
const model = require("../database").getModel("user");
const httpError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserBusiness {
    constructor() {
        // Create an instance of the data layer.
        this.dataLayer = new DataLayer(model);
    }

    /**
     *  Login a user.
     */
    async login(email, password) {
        return this.findUserByEmail(email)
            .then((user) => {
                const passwordIsValid = bcrypt.compareSync(
                    password,
                    user.password
                );
                // Invalid password, return 401
                if (!passwordIsValid) {
                    throw httpError(
                        401,
                        "Your email or password is incorrect."
                    );
                }
                // Create token and store in the session cookie
                const token = jwt.sign(
                    {
                        id: user._id,
                        type: user.type,
                        email: user.email,
                        username: user.username,
                    },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: 3600, // 1 hour
                    }
                );
                return {
                    token: token,
                    username: user.username,
                    type: user.type,
                    id: user._id,
                };
            })
            .catch(() => {
                throw httpError(400, "Your email or password is incorrect.");
            });
    }

    /**
     *  Register a user.
     */
    async register(user) {
        return this.createUser({
            username: user.username,
            email: user.email,
            password: user.password,
            type: "Driver",
        }).catch((error) => {
            throw httpError(400, error.message);
        });
    }

    /**
     *  Create a user and save it to the User collection.
     */
    async createUser(userToCreate) {
        if (!isUserDataValid(userToCreate)) {
            throw httpError(400, "User data is invalid.");
        }
        const user = {
            username: userToCreate.username,
            email: userToCreate.email,
            type: userToCreate.type,
            password: bcrypt.hashSync(userToCreate.password, 8),
        };

        return this.dataLayer.create(user).catch((error) => {
            if (error.message.includes("username"))
                throw httpError(400, "Username is already in use.");
            if (error.message.includes("email"))
                throw httpError(400, "Email is already in use.");
            throw httpError(404, error.message);
        });
    }

    /**
     *  Find a user by email
     */
    async findUserByEmail(email) {
        return this.dataLayer
            .findByProperty({ email: email })
            .then((users) => {
                // Email is unique so only 1 can be returned.
                return users[0];
            })
            .catch((error) => {
                throw httpError(404, error.message);
            });
    }
}
module.exports = UserBusiness;

/**
 *  Validates the data in a User.
 */
function isUserDataValid(user) {
    if (!user || !user.username || !user.email || !user.password) {
        return false;
    } else {
        return true;
    }
}
