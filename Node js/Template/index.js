const http = require("http");
const fs = require("fs");
const url = require("url");

const json_data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(json_data);

const overview = fs.readFileSync(`${__dirname}/overview.html`, "utf-8");
const product = fs.readFileSync(`${__dirname}/product.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/card.html`, "utf-8");

// this is for replace the tamplete from the html page
const replaceTamplate = (card, pro) => {
  let output = card.replace(/{%PRODUCTNAME%}/g, pro.productName);
  output = output.replace(/{%IMAGE%}/g, pro.image);
  output = output.replace(/{%ID%}/g, pro.id);
  output = output.replace(/{%COUNTRY%}/g, pro.from);
  output = output.replace(/{%PRICE%}/g, pro.price);
  output = output.replace(/{%NUTRI%}/g, pro.nutrients);
  output = output.replace(/{%DETAILS%}/g, pro.description);
  output = output.replace(/{%PRODUCTCOUNTRY%}/g, pro.from);
  output = output.replace(/{%QUE%}/g, pro.quantity);
  if (!pro.organic) output = output.replace("{%NOT_ORGANIC%}", "not-organic");
  return output;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // this is route overview and different pathnamename
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, { "content-Type": "text/html" });
    const cardHtml = dataObj.map((el) => replaceTamplate(card, el)).join("");
    const output = overview.replace("{%PRODUCT_CARD%}", cardHtml);
    res.end(output);
  }

  // this is routes at api
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("overview");
  }

  // this is route on product page
  else if (pathname === "/product") {
    res.writeHead(200, { "content-Type": "text/html" });
    const prod = dataObj[query.id];
    const output = replaceTamplate(product, prod);
    res.end(output);
  }
  // this is for not found
  else {
    res.writeHead(400, { "Content-Type": "text/html" });
    res.end("PAGE NOT FOUND");
  }
});

server.listen(3000, () => {
  console.log("I am now listning on 3000");
});