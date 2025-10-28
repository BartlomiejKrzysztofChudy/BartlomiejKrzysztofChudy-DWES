const fs = require('fs');
const nombre = process.argv[2];

if (!nombre) {
  console.log("Tienes que poner un nombre");
  process.exit(1);
}

fs.writeFileSync(`files/${nombre}.js`);

console.log(`Archivo files/${nombre}.js creado`);
