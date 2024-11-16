const getAllUsers = async (req, res) => {
  res.send("All User");
};
const getSingleUser = async (req, res) => {
  res.send("Single User");
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
