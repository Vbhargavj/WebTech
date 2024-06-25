const mongoose = require("mongoose");

const forumSchema = mongoose.Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "HUser",
    required: [true, "forum must have user"],
  },
});

const Forum = mongoose.model("forum", forumSchema);

module.exports = Forum;
