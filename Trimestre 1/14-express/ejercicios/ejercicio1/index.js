import express from 'express';

const app = express();
const port = 3000; 

app.get('/', (req, res) => {
  res.send('Hola Mundo ');
});

app.post('/', (req, res) => {
  res.send('Recibida una solicitud POST');
});

app.put('/user', (req, res) => {
  res.send('Recibida una solicitud PUT en /user');
});

app.delete('/user', (req, res) => {
  res.send('Recibida una solicitud DELETE en /user');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});