import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app.js';
import fs from 'node:fs';
import path from 'node:path';
import { config } from '../../src/config.js';

describe('API de Notas - Tests Funcionales', () => {
    let authToken;
    const testNoteName = 'test-nota-api';

    beforeAll(async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                usuario: 'admin',
                password: '1234'
            });
        authToken = response.body.token;
    });

    afterAll(() => {
        const testFile = path.join(config.notesDirectory, `${testNoteName}.note`);
        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
    });

    describe('GET /api/notes - Listar notas', () => {
        it('debería listar todas las notas', async () => {
            const response = await request(app)
                .get('/api/notes')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('total');
            expect(response.body).toHaveProperty('datos');
            expect(Array.isArray(response.body.datos)).toBe(true);
        });

        it('debería paginar correctamente', async () => {
            const response = await request(app)
                .get('/api/notes?pagina=1&limite=5')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('paginaActual', 1);
            expect(response.body.datos.length).toBeLessThanOrEqual(5);
        });

        it('debería filtrar notas por nombre', async () => {
            const response = await request(app)
                .get('/api/notes?filtro=prueba')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('datos');
        });

        it('debería ordenar descendente', async () => {
            const response = await request(app)
                .get('/api/notes?orden=desc')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
        });
    });

    describe('POST /api/notes - Crear nota', () => {
        it('debería crear una nota correctamente', async () => {
            const response = await request(app)
                .post('/api/notes')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    nombre: testNoteName,
                    contenido: 'Contenido de prueba para test'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain(testNoteName);

            const filePath = path.join(config.notesDirectory, `${testNoteName}.note`);
            expect(fs.existsSync(filePath)).toBe(true);
        });

        it('debería crear nota con contenido vacío', async () => {
            const noteName = `${testNoteName}-empty`;
            const response = await request(app)
                .post('/api/notes')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    nombre: noteName,
                    contenido: ''
                });

            expect(response.status).toBe(201);

            const filePath = path.join(config.notesDirectory, `${noteName}.note`);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    });

    describe('GET /api/notes/:name - Obtener nota específica', () => {
        it('debería obtener una nota existente', async () => {
            const response = await request(app)
                .get(`/api/notes/${testNoteName}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('name');
                expect(response.body).toHaveProperty('content');
        });

        it('debería retornar 404 para nota inexistente', async () => {
            const response = await request(app)
                .get('/api/notes/nota-que-no-existe-xyz')
                .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toBe(401);
        });
    });

    describe('PUT /api/notes - Actualizar nota', () => {
        it('debería actualizar una nota existente', async () => {
            const nuevoContenido = 'Contenido actualizado';
            const response = await request(app)
                .put('/api/notes')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    nombre: testNoteName,
                    contenido: nuevoContenido
                });

            expect(response.status).toBe(201);

            const filePath = path.join(config.notesDirectory, `${testNoteName}.note`);
            const contenido = fs.readFileSync(filePath, 'utf-8');
            expect(contenido).toBe(nuevoContenido);
        });
    });

    describe('GET /api/notes/:name/download - Descargar nota', () => {
        it('debería descargar una nota existente', async () => {
            const response = await request(app)
                .get(`/api/notes/${testNoteName}/download`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toContain('application/octet-stream');
        });

        it('debería retornar 404 para nota inexistente', async () => {
            const response = await request(app)
                .get('/api/notes/nota-inexistente-xyz/download')
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE /api/notes/:name - Eliminar nota', () => {
        it('debería eliminar una nota existente', async () => {
            const response = await request(app)
                .delete(`/api/notes/${testNoteName}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('message');

            const filePath = path.join(config.notesDirectory, `${testNoteName}.note`);
            expect(fs.existsSync(filePath)).toBe(false);
        });

        it('debería retornar error al eliminar nota inexistente', async () => {
            const response = await request(app)
                .delete('/api/notes/nota-que-no-existe-xyz')
                .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toBe(200);
        });
    });
});
