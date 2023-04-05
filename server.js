const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello world !');
});

server.listen(process.env.PORT || 3000);