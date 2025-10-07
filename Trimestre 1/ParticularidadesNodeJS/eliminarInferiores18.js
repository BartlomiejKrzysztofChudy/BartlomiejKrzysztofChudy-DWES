function eliminarNumeros(myArray = []){


    let numerosMayores = myArray.filter(numero => numero >= 18);
    console.log(numerosMayores); 
   
}

eliminarNumeros([1, 11, 18, 21, 34])
