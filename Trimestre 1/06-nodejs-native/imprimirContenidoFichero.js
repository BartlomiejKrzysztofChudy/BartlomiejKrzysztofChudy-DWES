const fs = require('fs');
const nombreArchivo = process.argv[2];


if(!nombreArchivo){
    console.error("Nombre del archivo invalido")
    process.exit(1)
}
try {
    const contenido = fs.readFileSync(nombreArchivo, 'utf8');
    console.log(contenido);
} catch (error) {
    console.error('Error al leer el archivo:', error.message);
}
