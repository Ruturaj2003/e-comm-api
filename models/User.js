const mongoose = require("mongoose");
const validator = require("validator");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide Name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    validate: {
      validator: validator.isEmail,
      message: "Please Provide A Valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["amin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
