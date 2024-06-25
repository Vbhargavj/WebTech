// const { name } = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const argon2 = require("argon2");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "name shoud be minimum 3"],
    maxlength: [40, "user must have maximum 40 character"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "password must be 8"],
  },
  confirmpassword: {
    type: String,
    validate(value) {
      // Access password using the current document instance
      return value === this.password;
    },
    message: "Passwords must match",
  },
  balance: {
    type: Number,
    default: 0.0,
  },
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
    const oken=await bcrypt.compare(candidatePassword,userPassword)
    console.log(oken);
    return oken;
};

userSchema.pre("save", async function (next) {
  console.log(this.password);
  if (!this.isModified("password")) return next();
  console.log(this.password);
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpassword = undefined;
  console.log(this.password);
});

const User = mongoose.model("PUser", userSchema);

module.exports = User;
