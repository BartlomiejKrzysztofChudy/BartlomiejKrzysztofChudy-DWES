// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      // Excluir archivos que hacen I/O o interactivos y no están destinados a pruebas unitarias
      exclude: [
        'src/app.js',
        'src/index.js',
        'src/controllers/application-controller.js',
        'src/controllers/note-controller.js',
        'src/loaders/**',
        'src/routes/index.js',
        'src/routes/menu-routes.js',
        'src/utils/input.js'
      ]
    }
  }
});
