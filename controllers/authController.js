const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/custom-api");
const User = require("../models/User");

const register = async (req, res) => {
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
