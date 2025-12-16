import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html', 'lcov'],
            exclude: [
                'node_modules/',
                'test/',
                'notas/',
                '.eslintrc.json',
                'vitest.config.js'
            ],
            all: true,
            lines: 80,
            functions: 80,
            branches: 80,
            statements: 80
        }
    }
});
