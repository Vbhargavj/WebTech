const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const CatchAsync = require("../utils/CatchAsync");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is not empty"],
    trim: true,
    maxlength: [40, "user must have maximum 40 character"],
    // minlength: [10, 'user must have minimum 10 character']
  },
  email: {
    type: String,
    required: [true, "email must be provide"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide right email"],
  },

  role: {
    type: String,
    enum: ["admin", "super", "user"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "password must be provide"],
    minlength: 8,
    select: false,
  },
  confirmpassword: {
    type: String,
    required: [true, "password must be provide"],
    minlength: 8,
    validator: function (el) {
      return el === this.password;
    },
    message: "password not same ",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpassword = undefined;
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  console.log(candidatePassword,userPassword);
  const token = await bcrypt.compare(candidatePassword, userPassword);
  console.log(token);
  return token;
};
const User = mongoose.model("HUser", userSchema);

module.exports = User;
