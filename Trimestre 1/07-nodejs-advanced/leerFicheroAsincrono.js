const fs = require('fs');
const path = require('path');

try {
  const ruta = path.join('./FicheroParaLeer.txt');
  const contenido = fs.readFileSync(ruta, 'utf8');
 
  console.log('Contenido del fichero:');
  console.log(contenido);

} catch (error) {
  console.error('Error al leer el fichero:', error.message);
}
