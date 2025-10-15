const promesa = new Promise((resolve, reject)=> {
    const error = false;
    if(!error){
        reject("Algo salio mal");
    }else{
        resolve("Todo correcto");
    }
});

promesa.then((msg) =>console.log(msg)).catch((err) => console.error(err));