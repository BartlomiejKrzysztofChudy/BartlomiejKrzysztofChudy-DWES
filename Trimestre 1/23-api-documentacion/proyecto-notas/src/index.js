import { app } from './app.js';
import { iniciarConsola } from './controllers/controlador-consola.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    iniciarConsola();
});
