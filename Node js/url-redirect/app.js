const express = require("express");
const morgan = require("morgan");
const app = express();
const router = require("./Routes/urlRouter");

app.use(morgan("combined"));
app.use(express.json());

app.use("/", router);

module.exports = app;
