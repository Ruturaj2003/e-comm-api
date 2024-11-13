const register = async (req, res) => {
  res.send("User Register ");
};
const login = async (req, res) => {
  res.send("User Login ");
};
const logout = async (req, res) => {
  res.send("User Logout");
};

module.exports = { register, login, logout };
