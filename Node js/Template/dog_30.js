const http = require("http");
const fs = require("fs");
const superagent = require("superagent");
// const { resolve } = require("path");
// const { reject } = require("superagent/lib/request-base");


const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) reject("i could not find the file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("I Can't find it");
      resolve("Success");
    });
  });
};

readFilePro(`${__dirname}/dog_data.txt`)
  .then((data) => {
    console.log(data);
    return superagent.get("https://dog.ceo/api/breeds/image/random");
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro("dog_url.txt", res.body.message);
  })
  .then(() => {
    console.log("Dog image URL file saved");
  })
  .catch((err) => {
    console.log(err.message);
  });
