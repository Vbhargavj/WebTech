const vbj = require('./routes');
const http=require('http')

const server = http.createServer(vbj);

server.listen(3000);