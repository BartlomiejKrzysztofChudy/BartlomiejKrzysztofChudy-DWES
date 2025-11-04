import { describe, it, expect } from 'vitest'
import { dateCompare } from '../src/comparaFecha'

describe('Ejercicio 3 - dateCompare', () => {
  it('retorna 0 si las fechas son iguales', () => {
    expect(dateCompare('2024-05-01', '2024-05-01')).toBe(0)
  })

  it('retorna 1 si la primera fecha es posterior', () => {
    expect(dateCompare('2024-05-02', '2024-05-01')).toBe(1)
  })

  it('retorna -1 si la primera fecha es anterior', () => {
    expect(dateCompare('2024-05-01', '2024-05-03')).toBe(-1)
  })

  it('lanza TypeError si alguna fecha no es válida', () => {
    expect(() => dateCompare('no-fecha', '2024-05-01')).toThrow(TypeError)
  })
})
