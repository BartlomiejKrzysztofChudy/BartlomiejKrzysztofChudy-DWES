import { describe, it, expect } from 'vitest';
import { fibonacci } from '../../src/utils/fibonacci.js';

describe('Utils - Fibonacci', () => {
    
    it('Debe devolver 0 si n es 0', () => {
        const resultado = fibonacci(0);
        expect(resultado).toBe(0);
    });

    it('Debe devolver 1 si n es 1', () => {
        expect(fibonacci(1)).toBe(1);
    });

    it('Debe devolver 8 si n es 6', () => {
        expect(fibonacci(6)).toBe(8);
    });

    it('Debe devolver 6765 si n es 20', () => {
        expect(fibonacci(20)).toBe(6765);
    });

    
    it('Debe devolver 0 si es negativo', () => {
        expect(fibonacci(-5)).toBe(0);
    });
});