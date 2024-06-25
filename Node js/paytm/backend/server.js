const mongoose = require("mongoose");
const app = require("./app");

const DB =
  "mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => {
  console.log("here i am online http://localhost:3000/");
});

app.listen(3000, () => {
  console.log("server started");
});
