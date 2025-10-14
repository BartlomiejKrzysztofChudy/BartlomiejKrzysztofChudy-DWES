function invertirObjeto(obj) {
    const resultado = {};
    
    for (const clave in obj) {
        if (obj.hasOwnProperty(clave)) {
            const valor = obj[clave];
            resultado[valor] = clave; 
        }
    }
    return resultado;
}


const original = { "z": "q", "w": "f" };
const invertido = invertirObjeto(original);
console.log(invertido);
