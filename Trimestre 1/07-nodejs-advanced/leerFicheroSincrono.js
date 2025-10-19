const fs = require('fs/promises');
const path = require('path');

const ruta = path.join('./FicheroParaLeer.txt');

async function leerArchivo() {

    try {
    
     const contenido = await fs.readFile(ruta, 'utf8');
     console.log('Contenido del fichero:');
     console.log(contenido);
     
    } catch (err) {
        console.error('Error al leer el fichero:', err.message);
    }
}

leerArchivo();



