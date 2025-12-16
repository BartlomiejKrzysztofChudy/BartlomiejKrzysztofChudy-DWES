import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app.js';

describe('Autenticación - Tests Funcionales', () => {
    let validToken;

    describe('POST /api/login', () => {
        it('debería hacer login exitoso con credenciales correctas', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    usuario: 'admin',
                    password: '1234'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('mensaje', 'Login correcto');
            
            validToken = response.body.token;
        });

        it('debería rechazar login con usuario incorrecto', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    usuario: 'wronguser',
                    password: 'admin123'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'Usuario o contraseñas incorrectos');
        });

        it('debería rechazar login con contraseña incorrecta', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    usuario: 'admin',
                    password: 'wrongpass'
                });

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'Usuario o contraseñas incorrectos');
        });

        it('debería rechazar login sin credenciales', async () => {
            const response = await request(app)
                .post('/api/login')
                .send({});

            expect(response.status).toBe(401);
        });
    });

    describe('Middleware de autenticación', () => {
        beforeAll(async () => {
            const response = await request(app)
                .post('/api/login')
                .send({
                    usuario: 'admin',
                    password: '1234'
                });
            validToken = response.body.token;
        });

        it('debería permitir acceso con token válido', async () => {
            const response = await request(app)
                .get('/api/notes')
                .set('Authorization', `Bearer ${validToken}`);

            expect(response.status).not.toBe(403);
            expect(response.status).not.toBe(401);
        });

        it('debería rechazar acceso sin token', async () => {
            const response = await request(app)
                .get('/api/notes');

            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('error', 'Acceso Dengado: Falta el Token');
        });

        it('debería rechazar acceso con token inválido', async () => {
            const response = await request(app)
                .get('/api/notes')
                .set('Authorization', 'Bearer token_invalido_123');

            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error', 'Token inválido o caducado');
        });

        it('debería aceptar token sin prefijo Bearer', async () => {
            const response = await request(app)
                .get('/api/notes')
                .set('Authorization', validToken);

            expect(response.status).not.toBe(403);
            expect(response.status).not.toBe(401);
        });
    });
});
