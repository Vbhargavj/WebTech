const fs = require("fs");

const path = "text.txt";

fs.readFile("./text.txt", "utf-8", (err, data) => {
  console.log(data);
});

fs.unlink("./text.txt", () => {
  console.log("deleted");
});

const data = "vbj";

fs.writeFile("./text.txt", data, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("writed");
});
