const mongoose = require("mongoose");

const tagSchema = mongoose.Schema({
    name: { type: String, required: true },
    color:{type:String}
});

const Tag = mongoose.model("tag", tagSchema);

module.exports = Tag;
