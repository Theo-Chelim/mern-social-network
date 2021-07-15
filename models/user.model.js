const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const { isEmail } = require("validator")

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [isEmail],
        },
        password: {
            type: String, 
            required: true,
            minLength: 6,
            maxLength: 1024,
        },
        picture: {
            type: String,
            default: "./uploads/pictures/anonyme-user.png",
        }
    },
    {
        timestamp: true
    }
)

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;