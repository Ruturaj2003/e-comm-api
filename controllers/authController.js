const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const User = require("../models/User");

const register = async (req, res) => {
  const { email } = req.body;

  const emailAlreadyExists = User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email Already Exists");
  }

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};
const login = async (req, res) => {
  res.send("User Login ");
};
const logout = async (req, res) => {
  res.send("User Logout");
};

module.exports = { register, login, logout };
