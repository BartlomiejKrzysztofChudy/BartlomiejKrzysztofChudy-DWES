function prepararCafe(nombre, tiempo){
    return new Promise((resolve) => {

        setTimeout(()=>{
            const segundos = tiempo / 1000;
            resolve(`El cafe ${nombre} ha tardado en prepararse ${segundos} segndos`);
        },tiempo)
    });
}

prepararCafe("Cortado", 3000).then(mensaje =>{console.log("Cafe listo ", mensaje);});
prepararCafe("Descafeinado", 2000).then(mensaje =>{console.log("Cafe listo ", mensaje);});
prepararCafe("Capuchino", 10000).then(mensaje =>{console.log("Cafe listo ", mensaje);});


