const app = require("./app");
const mongoose = require("mongoose");

const DB =
  "mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB).then(() => {
  console.log("connected successfully");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
