const chalk = require('chalk');

const color = process.argv[2];
const texto = process.argv[3] || 'Texto por defecto';

switch (color) {
  case 'azul':
    console.log(chalk.blue(texto));
    break;
  case 'rojo':
    console.log(chalk.red(texto));
    break;
  case 'verde':
    console.log(chalk.green(texto));
    break;
}
