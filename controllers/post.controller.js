const postModel = require("../models/post.model");

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};


module.exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: "",
    video: req.body.video,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};