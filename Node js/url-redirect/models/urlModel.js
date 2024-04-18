const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    reDirectUrl: {
      type: String,
      unique:true,
      required: true,
    },
    visitHistory: [
      {
        timeStamp: {
          type: Number,
        },
      },
    ],
  },

);
// urlSchema.pre('save',)

const URL = mongoose.model('URL',urlSchema);

module.exports=URL; 