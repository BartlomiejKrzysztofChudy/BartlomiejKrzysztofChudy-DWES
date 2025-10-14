function mejoresNotas(estudiantes) {
    return estudiantes.map(estudiante => {
        const {nombre, notas} = estudiante;

        const notaMaxima = Math.max(...notas);

        return {nombre, notaMaxima };
    });
}

const alumnos = [
    {nombre: 'John', notas: [3, 5, 4] },
    {nombre: 'Alice', notas: [2, 6, 4] },
    {nombre: 'Bob', notas: [5, 8, 5] }
];

console.log(mejoresNotas(alumnos));
