const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    unique: true,
  },
  keys: [String]
});

const User = mongoose.model("teUser", userSchema);

// Exporting the User model directly
module.exports = User;
