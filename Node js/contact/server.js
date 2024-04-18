const app = require("./app");

const { connectToMongo } = require("./connect.js");

connectToMongo(
    "mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority"
  ).then(() => {
    console.log("I am connected");
  });
  

app.listen(3000,() => {
  console.log("i am started");
});
