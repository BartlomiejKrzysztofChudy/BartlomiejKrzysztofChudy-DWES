import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockGet = vi.fn();
const mockPost = vi.fn();
const mockPut = vi.fn();
const mockDel = vi.fn();

vi.mock('../../src/services/jsonplaceholder-core.js', () => ({
    get: (...args) => mockGet(...args),
    post: (...args) => mockPost(...args),
    put: (...args) => mockPut(...args),
    del: (...args) => mockDel(...args)
}));

import * as Client from '../../src/services/jsonplaceholder-client.js';

beforeEach(() => {
    vi.clearAllMocks();
});

describe('jsonplaceholder-client', () => {
    it('listarPosts llama a GET /posts', () => {
        Client.listarPosts();
        expect(mockGet).toHaveBeenCalledWith('/posts');
    });

    it('obtenerPost llama a GET /posts/:id', () => {
        Client.obtenerPost(7);
        expect(mockGet).toHaveBeenCalledWith('/posts/7');
    });

    it('actualizarPost llama a PUT /posts/:id con body', () => {
        Client.actualizarPost(3, { title: 't' });
        expect(mockPut).toHaveBeenCalledWith('/posts/3', { title: 't' });
    });

    it('crearPost llama a POST /posts con body', () => {
        Client.crearPost({ title: 'x' });
        expect(mockPost).toHaveBeenCalledWith('/posts', { title: 'x' });
    });

    it('borrarPost llama a DELETE /posts/:id', () => {
        Client.borrarPost(4);
        expect(mockDel).toHaveBeenCalledWith('/posts/4');
    });
});
