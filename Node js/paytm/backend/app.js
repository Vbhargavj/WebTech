const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
const userRouter=require('./Routers/userRouter')


app.use('/api/v1/user',userRouter)

// app.use("/", (req, res) => {
//   res.json({ msg: "ok" });
// });


module.exports = app;
