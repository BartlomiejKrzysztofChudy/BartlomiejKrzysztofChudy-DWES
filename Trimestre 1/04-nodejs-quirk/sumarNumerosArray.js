function sumarNumeros(myArray = []){

   
    return numerosSumados = myArray.reduce((acumulador, numero) => acumulador + numero, 0);
}

console.log(sumarNumeros([1, 3, 6]));
console.log(sumarNumeros([2, 6, 12]));
