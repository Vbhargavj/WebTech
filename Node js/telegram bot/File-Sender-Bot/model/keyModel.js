const mongoose = require("mongoose");

const keysSchema = mongoose.Schema({
  keyId: {
    type: String,
  },
  keyItems: [String],
  userId: {
    type: String,
  },
});

const Keys = mongoose.model("Keys", keysSchema);

// Exporting the User model directly
module.exports = Keys;
