function resultadoResta(obj){

    const bien = obj.bien ?? 0;
    const mal = obj.mal ?? 0;


    return bien - mal;


}


console.log(resultadoResta({bien: 10, mal: 9}));
