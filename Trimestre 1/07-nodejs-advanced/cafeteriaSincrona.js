async function prepararCafe(nombre, tiempo){

    return new Promise((resolve)=>{
        setTimeout(()=>{
            const segundo = tiempo /1000;
            resolve(`El cafe ${nombre} ha taradodo en prepararse ${segundo} segundos`);
        });
    });

}


async function servirCafe(){
    const capuchino = await prepararCafe("capuchino", 8000) 
    console.log(capuchino);

    const cortado = await prepararCafe("cortado", 5000) 
    console.log(cortado);

    const cafeConLeche = await prepararCafe("cafeConLeche", 1000) 
    console.log(cafeConLeche);
}


servirCafe();