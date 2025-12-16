export function paginarDatos(listaCompleta, pagina, limite) {
    const paginaActual = Number(pagina) || 1;
    const elementosPorPagina = Number(limite) || 10;

    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const resultados = listaCompleta.slice(inicio, fin);

    return {
        total: listaCompleta.length,
        totalPaginas: Math.ceil(listaCompleta.length / elementosPorPagina),
        paginaActual,
        datos: resultados
    };
}
