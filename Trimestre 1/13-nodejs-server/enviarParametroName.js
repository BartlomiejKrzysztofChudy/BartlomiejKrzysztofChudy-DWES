import http from 'node:http';
import url from 'node:url';

const PORT = 3500;

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const { name } = parsedUrl.query; 
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (name) {
    res.statusCode = 200;
    res.end(`<h1>Hello ${name}!</h1>`);
  } else {
    res.statusCode = 400; 
    res.end('<h1>Introduzca un nombre</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});