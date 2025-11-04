import http from 'node:http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log(`New request`);
  res.setHeader('Content-type', 'text/html')
  res.end('Hello World!');
  
});

server.listen(PORT, () => {
  console.log(`Servidor en marcha http://localhost:${PORT}`);
});