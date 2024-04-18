const mongoose = require("mongoose");

exports.connectToMongo = async (url) => {
  return await mongoose.connect(url);
};
