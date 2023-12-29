const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url);
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>"); // You had a typo here: should be </head> instead of <head>
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    res.statusCode = 302;
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const bodyparser = Buffer.concat(body).toString(); // You missed the parentheses here
      console.log(bodyparser);
      const message = bodyparser.split("=")[1]; // Use [1] to get the value after '='
      fs.writeFileSync("first.txt", message);
    });
    res.setHeader("Location", "/");
    return res.end();
  }
  // res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
