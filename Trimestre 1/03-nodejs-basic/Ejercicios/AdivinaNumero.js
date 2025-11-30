function adivinaNumero(numero = 0){
    let numeroRandom = Math.floor(Math.random() * 10) + 1;


    if(numero === numeroRandom){
        console.log(`Has acertado el numero ${numeroRandom}`);
    }else {
        console.log(`No has acertado el numero ${numeroRandom}`);
    }
}

adivinaNumero(8);