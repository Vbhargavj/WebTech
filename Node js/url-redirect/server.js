const { connectToMongo } = require("./connect");

const PORT = 3000;

connectToMongo(
  "mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority"
).then(() => {
  console.log("I am connected");
});

const app = require("./app");

app.listen(PORT, () => {
  console.log(`I am started on http//localhost:${PORT}/`);
});
