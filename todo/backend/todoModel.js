const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});
todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
