export async function apiCliente(url) {
  if (!url) throw new Error('URL obligatoria')

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Error de red')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error en apiCliente:', error.message)
    throw error
  }
}
