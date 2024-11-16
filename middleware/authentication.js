const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new CustomError.UnauthenticatedError("Auth Invalid");
  }
  try {
    const payload = isTokenValid({ token });
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    };
    console.log(payload);
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Auth Invalid");
  }
};

module.exports = {
  authenticateUser,
};
