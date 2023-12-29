const http = require("http");
const fs = require("fs");
const superagent = require("superagent");
// urll = "https://dog.ceo/api/breeds/image/random";

fs.readFile(`${__dirname}/dg_data.txt`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  superagent.get("https://dog.ceo/api/breeds/image/random").then((res) => {
    console.log(res.body.message);

    fs.writeFile("dog_url.txt", res.body.message, (err) => {
      console.log("I just write a file");
    });
  }).catch(err=>{
    console.log(err.message);
  });
});
