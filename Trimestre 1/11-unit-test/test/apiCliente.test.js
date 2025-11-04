import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiCliente } from '../src/apiCliente.js'

describe('Ejercicio 5 - apiCliente', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('lanza error si no se pasa URL', async () => {
    await expect(apiCliente()).rejects.toThrow('URL obligatoria')
  })

  it('retorna datos si la respuesta es correcta', async () => {
    const mockData = { nombre: 'Bartlomiej' }
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    })

    const data = await apiCliente('https://api.test.com')
    expect(data).toEqual(mockData)
  })

  it('lanza error si la respuesta no es OK', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn(),
    })

    await expect(apiCliente('https://api.error.com')).rejects.toThrow('Error de red')
  })

  it('lanza error si fetch falla completamente', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Fallo de conexión'))

    await expect(apiCliente('https://api.fail.com')).rejects.toThrow('Fallo de conexión')
  })
})
