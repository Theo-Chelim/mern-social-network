const jwt = require("json-web-token")
const UserModel = require("../models/user.model")

module.exports.signUp = async (req, res) => {

    const {pseudo, email, password} = req.body
    try {
        const user = await UserModel.create({pseudo, email, password})
        res.status(201).json({user: user})
    } catch(err) {
        res.status(201).json(err);
    }
};

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await UserModel.login(email, password);
        
        console.log(user._id)
        res.status(200).json(user._id)
    } catch(err) {
        res.status(200).json(err);
    }
};

module.exports.logout = async (req, res) => {};