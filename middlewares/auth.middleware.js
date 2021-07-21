const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

module.exports.checkUser = (req, res, next) => {
  const token = req.cookie.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
      }
    });
  } else {
    res.locals.user = null;
  }
  next();
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.cookie.jwt;
  if (token) {
    return res.status(200).json({ id: token.id });
  } else {
    console.log("No token");
  }
  next();
};
