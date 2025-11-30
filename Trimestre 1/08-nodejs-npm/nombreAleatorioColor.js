import chalk from 'chalk';
import { faker } from '@faker-js/faker';

const colores = [chalk.blue, chalk.red, chalk.yellow, chalk.green, chalk.gray];


function nombreAleatorio() {

    const nombre = faker.internet.username();
    const color = colores[Math.floor(Math.random() * colores.length)];

    console.log('Nombre:', color(nombre));
}

console.log();
nombreAleatorio();

