import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcryptjs';

const mockListarPosts = vi.fn();
const mockObtenerPost = vi.fn();
const mockActualizarPost = vi.fn();
const mockCrearPost = vi.fn();
const mockBorrarPost = vi.fn();

vi.mock('../../src/services/jsonplaceholder-client.js', () => ({
    listarPosts: (...args) => mockListarPosts(...args),
    obtenerPost: (...args) => mockObtenerPost(...args),
    actualizarPost: (...args) => mockActualizarPost(...args),
    crearPost: (...args) => mockCrearPost(...args),
    borrarPost: (...args) => mockBorrarPost(...args)
}));

// Configuramos credenciales antes de importar la app
process.env.ADMIN_USER = 'admin';
process.env.ADMIN_PASS = bcrypt.hashSync('test123', 10);
process.env.JWT_SECRET = 'test_secret';

let app;

beforeAll(async () => {
    ({ app } = await import('../../src/app.js'));
});

beforeEach(() => {
    vi.clearAllMocks();
});

describe('API placeholder', () => {
    it('lista posts', async () => {
        mockListarPosts.mockResolvedValueOnce([{ id: 1, title: 'uno' }]);

        const res = await request(app).get('/api/placeholder/posts');

        expect(res.status).toBe(200);
        expect(res.body).toEqual([{ id: 1, title: 'uno' }]);
        expect(mockListarPosts).toHaveBeenCalledTimes(1);
    });

    it('obtiene un post por id', async () => {
        mockObtenerPost.mockResolvedValueOnce({ id: 5, title: 'cinco' });

        const res = await request(app).get('/api/placeholder/posts/5');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: 5, title: 'cinco' });
        expect(mockObtenerPost).toHaveBeenCalledWith('5');
    });

    it('crea un post', async () => {
        const body = { title: 'nuevo', body: 'texto', userId: 1 };
        mockCrearPost.mockResolvedValueOnce({ id: 101, ...body });

        const res = await request(app)
            .post('/api/placeholder/posts')
            .send(body)
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(201);
        expect(res.body).toEqual({ id: 101, ...body });
        expect(mockCrearPost).toHaveBeenCalledWith(body);
    });

    it('actualiza un post', async () => {
        const body = { title: 'mod', body: 'cambio' };
        mockActualizarPost.mockResolvedValueOnce({ id: 2, ...body });

        const res = await request(app)
            .put('/api/placeholder/posts/2')
            .send(body)
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: 2, ...body });
        expect(mockActualizarPost).toHaveBeenCalledWith('2', body);
    });

    it('borra un post', async () => {
        mockBorrarPost.mockResolvedValueOnce({ ok: true });

        const res = await request(app).delete('/api/placeholder/posts/3');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ ok: true });
        expect(mockBorrarPost).toHaveBeenCalledWith('3');
    });
});

describe('Login', () => {
    it('devuelve token con credenciales correctas', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ usuario: 'admin', password: 'test123' })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    it('rechaza credenciales incorrectas', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ usuario: 'admin', password: 'mala' })
            .set('Content-Type', 'application/json');

        expect(res.status).toBe(401);
    });
});
