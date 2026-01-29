import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const fetchMock = vi.fn();

global.fetch = fetchMock;

import * as Core from '../../src/services/jsonplaceholder-core.js';

beforeEach(() => {
    fetchMock.mockReset();
});

afterEach(() => {
    fetchMock.mockReset();
});

describe('jsonplaceholder-core', () => {
    it('GET ok', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 200,
            text: () => Promise.resolve('{"id":1}')
        });
        const res = await Core.get('/posts/1');
        expect(res).toEqual({ id: 1 });
        expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        });
    });

    it('POST envía body y parsea JSON', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 201,
            text: () => Promise.resolve('{"id":101,"title":"t"}')
        });
        const res = await Core.post('/posts', { title: 't' });
        expect(res).toEqual({ id: 101, title: 't' });
        expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ title: 't' })
        });
    });

    it('PUT envía body', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 200,
            text: () => Promise.resolve('{"ok":true}')
        });
        const res = await Core.put('/posts/1', { title: 'x' });
        expect(res).toEqual({ ok: true });
        expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify({ title: 'x' })
        });
    });

    it('DELETE ok', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            status: 200,
            text: () => Promise.resolve('')
        });
        const res = await Core.del('/posts/1');
        expect(res).toBeNull();
        expect(fetchMock).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        });
    });

    it('lanza error en respuesta no ok con JSON', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 500,
            text: () => Promise.resolve('{"error":"fail"}')
        });
        await expect(Core.get('/error')).rejects.toThrow('JSONPlaceholder API error 500: {"error":"fail"}');
    });

    it('lanza error en respuesta no ok con texto plano', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 404,
            text: () => Promise.resolve('Not found')
        });
        await expect(Core.get('/missing')).rejects.toThrow('JSONPlaceholder API error 404: Not found');
    });
});
