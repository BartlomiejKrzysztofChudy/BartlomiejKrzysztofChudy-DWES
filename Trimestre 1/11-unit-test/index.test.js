import{expect, test} from 'vitest'
import {helloWorld, sumar} from './index.js'

test('Suma correctamente', () =>{
    expect(sumar(1,3)).toBe(4);
    expect(sumar(1,30)).toBe(31);
    expect(sumar(0,10)).toBe(10);
    expect(sumar(-1,3)).toBe(2);
});

test('Should return Hello World!', () => {
    expect(helloWorld()).toBe("Hello World");
});

test('Should return Hello Gabri', () => {
    expect(helloWorld("Gabri")).toBe("Hello Gabri");
});


