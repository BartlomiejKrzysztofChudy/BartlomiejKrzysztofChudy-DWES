import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as servicio from '../../src/services/servicio-notas.js';
import * as modelo from '../../src/models/modelo-notas.js';

// Mock del modelo
vi.mock('../../src/models/modelo-notas.js');

describe('Servicio de Notas - Tests Unitarios', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('obtenerListaNotas', () => {
        it('debería devolver lista ordenada ascendente por defecto', () => {
            modelo.obtenerTodas.mockReturnValue(['zebra.note', 'alpha.note', 'beta.note']);

            const resultado = servicio.obtenerListaNotas();

            expect(resultado).toEqual(['alpha.note', 'beta.note', 'zebra.note']);
        });

        it('debería devolver lista ordenada descendente', () => {
            modelo.obtenerTodas.mockReturnValue(['alpha.note', 'beta.note', 'zebra.note']);

            const resultado = servicio.obtenerListaNotas(null, 'desc');

            expect(resultado).toEqual(['zebra.note', 'beta.note', 'alpha.note']);
        });

        it('debería filtrar notas por nombre', () => {
            modelo.obtenerTodas.mockReturnValue(['prueba.note', 'test.note', 'ejemplo.note']);

            const resultado = servicio.obtenerListaNotas('pru');

            expect(resultado).toEqual(['prueba.note']);
        });

        it('debería manejar lista vacía', () => {
            modelo.obtenerTodas.mockReturnValue([]);

            const resultado = servicio.obtenerListaNotas();

            expect(resultado).toEqual([]);
        });
    });

    describe('guardarNota', () => {
        it('debería agregar extensión .note si no la tiene', () => {
            servicio.guardarNota('prueba', 'contenido');

            expect(modelo.guardar).toHaveBeenCalledWith('prueba.note', 'contenido');
        });

        it('no debería duplicar extensión .note', () => {
            servicio.guardarNota('prueba.note', 'contenido');

            expect(modelo.guardar).toHaveBeenCalledWith('prueba.note', 'contenido');
        });

        it('debería lanzar error si nombre está vacío', () => {
            expect(() => servicio.guardarNota('', 'contenido')).toThrow('El nombre de la nota no puede estar vacio');
        });

        it('debería guardar con contenido vacío si no se proporciona', () => {
            servicio.guardarNota('test');

            expect(modelo.guardar).toHaveBeenCalledWith('test.note', '');
        });
    });

    describe('leerNota', () => {
        it('debería leer nota con extensión agregada', () => {
            modelo.leer.mockReturnValue('contenido de prueba');

            const resultado = servicio.leerNota('test');

            expect(modelo.leer).toHaveBeenCalledWith('test.note');
            expect(resultado).toBe('contenido de prueba');
        });

        it('debería retornar null si no hay nombre', () => {
            const resultado = servicio.leerNota('');

            expect(resultado).toBeNull();
        });
    });

    describe('eliminarNota', () => {
        it('debería eliminar nota con extensión agregada', () => {
            const resultado = servicio.eliminarNota('test');

            expect(modelo.eliminar).toHaveBeenCalledWith('test.note');
            expect(resultado).toBe(true);
        });

        it('debería retornar null si no hay nombre', () => {
            const resultado = servicio.eliminarNota('');

            expect(resultado).toBeNull();
        });
    });
});
