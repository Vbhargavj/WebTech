const { connectToMongo } = require("./connect");


connectToMongo(
  "mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
  console.log("I am connected");
});
