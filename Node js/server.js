const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req.url, req.method, req.headers);
  res.setHeader("contentview", "text/html");
  res.write("<html>");
  res.write("<head><title>Vbj Server</title></head>");
  res.write('<body>')
  res.write('<h1>Hello vbj i am server</h1>')
  res.write('</body>')
  res.write("</html>");
  res.end()
});

server.listen(8000,'127.0.0.1',()=>{
  console.log("I am listing now")
});
