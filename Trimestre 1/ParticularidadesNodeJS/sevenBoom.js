function sevenBoom(numero){

    const cadenaNumero = String(numero);


    if(numero % 7 == 0 || cadenaNumero.includes("7")){
        console.log(`BOOM Numero: ${numero}`);
    }else{
        console.log(`Numero: ${numero} incorrecto`);
    }


}

sevenBoom(91);
sevenBoom(10);






