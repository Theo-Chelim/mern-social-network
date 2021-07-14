const mongoose = require("mongoose")
const { isEmail } = require("validator")

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
        }
    }
)

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;