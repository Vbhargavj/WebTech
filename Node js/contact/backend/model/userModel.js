// const { decrypt } = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: [true, "password must be provide"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "password must be provide"],
    minlength: 8,
    validator: function(el) {
      return el === this.password;
    },
    message: "password not same ",
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpireIn: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 11);
  this.confirmPassword = undefined;
});

userSchema.methods.correctPassword = async function(candidatePass, userPass) {
  console.log(candidatePass,userPass);
  return await bcrypt.compare(candidatePass, userPass);
};
const User = mongoose.model("COUSER", userSchema);

module.exports = User;
