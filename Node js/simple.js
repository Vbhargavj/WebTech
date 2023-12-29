const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const path = req.url;
  if (path === "/") {
    res.end("overview");
  } else if (path === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" }); // Corrected the Content-Type
    fs.readFile(`${__dirname}/data.json`, "utf-8", (err, data) => {
      if (err) {
        res.end("Error reading the file");
      } else {
        const jsonData = JSON.parse(data);
        res.end(JSON.stringify(jsonData)); // Send the JSON data as the response
      }
    });
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening on port 8000");
});
