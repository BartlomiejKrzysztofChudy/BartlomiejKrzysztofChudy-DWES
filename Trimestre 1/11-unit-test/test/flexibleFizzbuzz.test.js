import { describe, it, expect } from 'vitest'
import { flexibleFizzBuzz } from '../src/flexibleFizzbuzz.js'

describe('Ejercicio 4 - flexibleFizzBuzz', () => {
  const cond = [
    { divisor: 2, word: 'poo' },
    { divisor: 3, word: 'foo' },
  ]

  it('devuelve el número si no es múltiplo de ninguno', () => {
    expect(flexibleFizzBuzz(1, cond)).toBe(1)
  })

  it('devuelve palabra si cumple una condición', () => {
    expect(flexibleFizzBuzz(2, cond)).toBe('poo')
  })

  it('devuelve palabra combinada si cumple varias', () => {
    expect(flexibleFizzBuzz(6, cond)).toBe('poofoo')
  })
})
