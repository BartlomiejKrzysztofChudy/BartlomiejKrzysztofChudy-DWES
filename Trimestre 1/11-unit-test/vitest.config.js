import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Activa la cobertura de código
    coverage: {
      // Especifica el motor de cobertura a usar
      provider: 'v8',

      // ¡Esta es la línea clave que necesitas!
      // Define los formatos de reporte que se generarán.
      // Mantenemos los que ya tenías y añadimos 'lcov'.
      reporter: ['text', 'json', 'html', 'lcov'],
    },
  },
})