import express from 'express'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/header', (req, res) => {
  const token = req.headers['token'] || req.headers['Token'] || req.headers['authorization']; 
  console.log('Token recibido en /header:', token);

  if (!token) {
    return res.status(401).json({
      code: 401,
      error: "Unauthorized",
      message: "Error: Set a token to login"
    });
  }
  return res.status(200).json({ token });
});


app.get('/params/:name', (req, res) => {
  const { name } = req.params;
  return res.status(200).send(`Hola ${name}`);
});


app.get('/query', (req, res) => {
  let { numero  } = req.query;
  numero = Number(n);

  if (!Number.isFinite(numero) || numero <= 0) {
    numero = 100;
  } else {
    numero = Math.floor(numero);
  }
  const suma = (numero * (numero + 1)) / 2;
  return res.status(200).json({ numero, suma });
});

app.post('/body', (req, res) => {
  const body = req.body || {};

  let html = '<!doctype html><html><head><meta charset="utf-8"><title>Body</title></head><body>';
  html += '<h1>Contenido del body</h1>';
  html += '<ul>';

  for (const key of Object.keys(body)) {
    const value = typeof body[key] === 'object' ? JSON.stringify(body[key]) : String(body[key]);

    html += `<li><strong>${key}:</strong> ${value}</li>`;
  }

  if (Object.keys(body).length === 0) {
    html += '<li>sin parámetros</li>';
  }
  html += '</ul></body></html>';

  return res.status(200).send(html);
});

const animalsRouter = express.Router();

animalsRouter.get('/dog', (req, res) => {
  res.json({ grow: 'guau guau' });
});

animalsRouter.get('/cat', (req, res) => {
  res.json({ grow: 'miau' });
});

animalsRouter.get('/bird', (req, res) => {
  res.json({ grow: 'pio pio' });
});

app.use('/animals', animalsRouter);


app.use((req, res) => {
  res.status(404).json({
    code: 404,
    error: "Not Found",
    message: "Error: Path not found"
  });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
