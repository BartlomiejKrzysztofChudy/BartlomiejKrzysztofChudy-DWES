import app from './app.js'

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Servidor en marcha en el puerto: ${PORT}`);
})