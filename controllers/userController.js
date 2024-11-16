const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const CustomError = require("../errors");

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({ role: "user" }).select("-password");

  res.status(StatusCodes.OK).json({ allUsers });
};
const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json(user);
};

const showCurrentUser = async (req, res) => {
  res.send("Current User");
};
const updateUser = async (req, res) => {
  res.send("Update User");
};
const updateUserPassword = async (req, res) => {
  res.send("User password update");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
