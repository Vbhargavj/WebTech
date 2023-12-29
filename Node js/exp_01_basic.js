const express = require("express");

const http = require("http");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use("/add-product", (req, res, next) => {
  console.log("Now i am in midleware");
  res.send(
    '<form action="/product" method="post"><input type="text" name="title"></input><button type="submit" >add product</button></form>'
  );
});

app.use("/product", (req, res, next) => {
  console.log("This is another one");
  console.log(req.body)
  res.redirect("/");
});
app.use('/',(req,res,next)=>{
  console.log("yes")
  res.send("<h1>Hello from the server 2.0</h1>");
})
app.listen(3000);
