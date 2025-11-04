// test/fizzbuzz.test.js
import { describe, it, expect } from 'vitest'
import { fizzBuzz } from '../src/fizzbuzz.js'

describe('Ejercicio 2 - FizzBuzz', () => {
  it('devuelve "Fizz" si es múltiplo de 3', () => {
    expect(fizzBuzz(6)).toBe('Fizz')
  })

  it('devuelve "Buzz" si es múltiplo de 5', () => {
    expect(fizzBuzz(10)).toBe('Buzz')
  })

  it('devuelve "FizzBuzz" si es múltiplo de 15', () => {
    expect(fizzBuzz(30)).toBe('FizzBuzz')
  })

  it('devuelve el número si no es múltiplo de 3 ni de 5', () => {
    expect(fizzBuzz(7)).toBe(7)
  })
})
