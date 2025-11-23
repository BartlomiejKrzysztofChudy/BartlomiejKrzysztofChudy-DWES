import { describe, it, expect, beforeEach } from 'vitest';
import User from '../src/models/user.js';

describe('Pruebas Unitarias del Modelo User', () => {

    beforeEach(() => {
        User.users = []; 
    });

    it('Debería crear un usuario nuevo y asignarle un ID', () => {

        const datos = { nombre: 'TestMan', email: 'test@test.com' };
        const nuevoUsuario = User.create(datos);

        expect(nuevoUsuario.id).toBe(1); 
        expect(User.users.length).toBe(1); 
        expect(nuevoUsuario.nombre).toBe('TestMan'); 
    });

    it('Debería encontrar un usuario por su ID', () => {
        User.create({ nombre: 'Buscado', email: 'buscado@test.com' });
        const encontrado = User.findById(1);

        expect(encontrado).toBeDefined(); 
        expect(encontrado.nombre).toBe('Buscado');
    });

    it('Debería devolver undefined si el usuario no existe', () => {
        const encontrado = User.findById(999); 
        expect(encontrado).toBeNull(); 
    });

    it('Debería borrar un usuario correctamente', () => {
        User.create({ nombre: 'A Borrar', email: 'borrar@test.com' });
       
        const resultado = User.delete(1);

        expect(resultado).toBe(true); 
        expect(User.users.length).toBe(0); 
    });
});