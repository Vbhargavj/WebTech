const express = require("express");

const app = express();
const contactRouter = require("./router/contactRouter");
const authRouter = require("./router/authRouter");
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("hello there");
});

app.use("/api/v1", contactRouter);
app.use("/user", authRouter);
module.exports = app;
