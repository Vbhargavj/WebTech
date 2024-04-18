const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const urlModel=mongoose.model("TeleUser",userSchema);

module.exports=urlModel;