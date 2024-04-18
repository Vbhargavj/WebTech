const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
});

// Creating the User model
const User = mongoose.model('teUser', urlSchema);

// Exporting the User model directly
module.exports = User;
