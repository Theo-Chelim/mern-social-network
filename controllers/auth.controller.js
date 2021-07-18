const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const ErrorUtils = require("../utils/errors.utils")

const maxAge = 3 * 24 * 60 * 60 * 1000;

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user });
  } catch (err) {
    const errors = ErrorsUtils.signUpErrors(err);
    res.status(400).json({errors});
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.login(email, password);
    const token = generateToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = ErrorUtils.signInErrors(err);
    res.status(401).json({errors});
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(204).json()
};