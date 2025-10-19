async function esperar(ms) {
    
    return new Promise((resolve)=>{
        
        setTimeout(() =>{
            resolve(`Han pasado ${ms} milisegundos`);
        }, ms)
    });
}

esperar(2000).then(mensaje =>{
  console.log('Promesa cumplida:', mensaje);
});

console.log("Mensaje inmediato desdepues de llamar esperar()");


