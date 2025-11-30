function oddishEvenish(numero) {
    
    const digitos = String(numero);

    let suma = 0;
    for (let i = 0; i < digitos.length; i++) {
        suma += Number(digitos[i]);
    }

    if (suma % 2 === 0) {
        return "Evenish";
    } else {
        return "Oddish";
    }
}

console.log(oddishEvenish(23));
console.log(oddishEvenish(123));

