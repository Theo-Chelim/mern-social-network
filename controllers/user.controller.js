const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.getUserInfos = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).json("Invalid user");

  UserModel.findById(req.params.id, (err, docs) => {
    if (err) {
      console.log("Find user error: " + err);
    } else {
      return res.status(200).json(docs);
    }
  }).select("-password");
};

module.exports.setUserBio = async (req, res) => {};

module.exports.follow = async (req, res) => {};

module.exports.unfollow = async (req, res) => {};
