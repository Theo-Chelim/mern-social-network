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

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).json("Invalid user");

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.setUserBio = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(404).json("Invalid user");

  try {
    await findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err, docs) => {
        if (err) {
          return res.status(500).json("Error to update bio");
        } else {
          return res.status(200).json(docs);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.id_to_follow)
  )
    return res.status(404).json("Invalid user");
  try {
    await findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          following: req.body.id_to_follow,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) {
          return res.status(400).json("Error to add following user");
        }
      }
    );

    await findOneAndUpdate(
      { _id: req.body_id_to_follow },
      {
        $addToSet: {
          followers: req.params.id,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) {
          return res.status(400).json("Error to add followers user");
        } else {
          return res.status(200).json(docs);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.id_to_follow)
  )
    return res.status(404).json("Invalid user");
  try {
    await findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          following: req.body.id_to_follow,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) {
          return res.status(500).json("Error to remove following user");
        }
      }
    );

    await findOneAndUpdate(
      { _id: req.body_id_to_follow },
      {
        $pull: {
          followers: req.params.id,
        },
      },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) {
          return res.status(500).json("Error to remove followers user");
        } else {
          return res.status(200).json(docs);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
