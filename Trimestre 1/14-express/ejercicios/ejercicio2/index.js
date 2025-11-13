import express from'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Página de Inicio</h1><p>Bienvenido a mi servidor.</p>');
});

app.get('/about', (req, res) => {
  res.send('<p>Esta es la sección sobre nosotros.</p>');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
  console.log(`- http://localhost:${port}/`);
  console.log(`- http://localhost:${port}/about`);
});