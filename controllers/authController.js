const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email Already Exists");
  }

  // First Registered User Will be Admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";
  const user = await User.create({ name, email, password, role }); // Even if someone tries to pass role , it wont do anything

  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  // Issue a JWT Token
  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(StatusCodes.CREATED).json({ user: tokenUser, token });
};
const login = async (req, res) => {
  res.send("User Login ");
};
const logout = async (req, res) => {
  res.send("User Logout");
};

module.exports = { register, login, logout };
