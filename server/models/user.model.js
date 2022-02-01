// Model for the User
module.exports = (mongoose) => {
    var UserSchema = mongoose.Schema({
        username: {
            type: String,
            required: [true, "You must supply the user's username."],
            minlength: [5, "Your username must be at least 5 letters."],
            unique: true,
        },
        email: {
            type: String,
            required: [true, "You must supply the user's email."],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "You must supply the user's password"],
            minlength: [5, "Your password must be at least 8 letters."],
        },
        type: {
            type: String,
            required: [true, "You must supply the user's role."],
            enum: {
                values: ["Driver", "Toll Operator"],
                message: "Type is not valid. Must be 'Driver'.",
            },
        },
    });

    return mongoose.model("user", UserSchema);
};
