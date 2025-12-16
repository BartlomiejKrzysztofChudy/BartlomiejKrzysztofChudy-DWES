import { describe, it, expect } from 'vitest';
import { paginarDatos } from '../../src/utils/paginacion.js';

describe('Paginación - Tests Unitarios', () => {
    describe('Casos básicos', () => {
        it('debería paginar correctamente con 10 elementos', () => {
            const datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const resultado = paginarDatos(datos, 1, 5);

            expect(resultado.total).toBe(10);
            expect(resultado.paginaActual).toBe(1);
            expect(resultado.totalPaginas).toBe(2);
            expect(resultado.datos).toEqual([1, 2, 3, 4, 5]);
        });

        it('debería devolver la segunda página correctamente', () => {
            const datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const resultado = paginarDatos(datos, 2, 5);

            expect(resultado.paginaActual).toBe(2);
            expect(resultado.datos).toEqual([6, 7, 8, 9, 10]);
        });

        it('debería manejar límites por defecto', () => {
            const datos = Array.from({ length: 15 }, (_, i) => i + 1);
            const resultado = paginarDatos(datos, 1);

            expect(resultado.datos.length).toBe(10);
            expect(resultado.totalPaginas).toBe(2);
        });
    });

    describe('Casos extremos', () => {
        it('debería manejar array vacío', () => {
            const resultado = paginarDatos([], 1, 5);

            expect(resultado.total).toBe(0);
            expect(resultado.datos).toEqual([]);
            expect(resultado.totalPaginas).toBe(0);
        });

        it('debería manejar página fuera de rango', () => {
            const datos = [1, 2, 3];
            const resultado = paginarDatos(datos, 10, 5);

            expect(resultado.datos).toEqual([]);
        });

        it('debería manejar límite mayor que total de datos', () => {
            const datos = [1, 2, 3];
            const resultado = paginarDatos(datos, 1, 100);

            expect(resultado.datos).toEqual([1, 2, 3]);
            expect(resultado.totalPaginas).toBe(1);
        });
    });
});
