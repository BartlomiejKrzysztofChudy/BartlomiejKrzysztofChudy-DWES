function prepareGifts(gifts) {

  const sinDuplicados = [...new Set(gifts)];

  const ordenados = sinDuplicados.sort((a, b) => a - b);


  return ordenados;
}

