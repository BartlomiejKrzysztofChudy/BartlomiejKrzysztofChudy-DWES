import { describe, it, expect, vi } from 'vitest';
import { getFibonacci } from '../../src/controllers/fibonacci-controller.js';

describe('Controller - Fibonacci', () => {

    it('responder con status 400 si no se envía un número', () => {
        const req = {
            query: { n: 'hola' }, 
            params: {}
        };

        const res = {
            status: vi.fn().mockReturnThis(), 
            json: vi.fn()
        };
        getFibonacci(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            error: expect.any(String)
        }));
    });

    it('responder con el cálculo correcto si n es válido', () => {
        const req = {
            query: { n: '6' }, 
            params: {}
        };

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };

        getFibonacci(req, res);

       
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            numero: 6,
            fibonacci: 8
        });
    });
});