import app from './app.js'
import { loadUsers } from './src/loaders/load-users.js';

const PORT = 3000;

loadUsers();
app.listen(PORT, () => {
    console.log(`Servidor en marcha en el puerto: ${PORT}`)
});