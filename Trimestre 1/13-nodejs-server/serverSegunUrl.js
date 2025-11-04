import http from 'node:http';

const PORT = 3100;
const server = http.createServer((req, res) => {

  res.setHeader('Content-type', 'text/html')

if (req.url === '/') {
  res.end(`<h1>Bienvenido a mi servidor</h1>`);

} else if (req.url === '/sobre-nosotros') {
  res.end(`<h1>Este servidor ha sido creado el 04/11/2025</h1>`);

} else if (req.url === '/contacto') {
  res.end(`<h1>Contacto: server@gmail.com</h1>`);

} else {
  res.statusCode = 404;
  res.end(`<h1>Página no encontrada</h1>`);
}

});

server.listen(PORT, () => {
  console.log(`Servidor en marcha http://localhost:${PORT}`);
});