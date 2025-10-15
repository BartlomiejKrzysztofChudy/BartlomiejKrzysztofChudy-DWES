async function verificarProducto(producto){
    
    return new Promise((resolve, reject) =>{

        setTimeout(() => {
            if(producto.stock > 0){
                resolve("El producto esta disponible");
            }else{
                reject("El producto no esta disponible")
            }
        }, 2000);
    });
}


verificarProducto({stock:0}).then((msg)=> console.log(msg)).catch((err) => console.error(err));

verificarProducto({stock:7}).then((msg) => console.log(msg)).catch((err) => console.error(err));

