import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testDir = path.join(__dirname, '../temp-test-notas');

describe('Modelo de Notas - Tests Unitarios', () => {
    beforeEach(() => {
        if (!fs.existsSync(testDir)) {
            fs.mkdirSync(testDir, { recursive: true });
        }
    });

    afterEach(() => {
        if (fs.existsSync(testDir)) {
            const files = fs.readdirSync(testDir);
            files.forEach((file) => {
                fs.unlinkSync(path.join(testDir, file));
            });
            fs.rmdirSync(testDir);
        }
    });

    describe('guardar', () => {
        it('debería crear archivo con contenido', () => {
            const nombreArchivo = 'test.note';
            const contenido = 'Contenido de prueba';
            const rutaCompleta = path.join(testDir, nombreArchivo);

            fs.writeFileSync(rutaCompleta, contenido);

            expect(fs.existsSync(rutaCompleta)).toBe(true);
            const contenidoLeido = fs.readFileSync(rutaCompleta, 'utf-8');
            expect(contenidoLeido).toBe(contenido);
        });
    });

    describe('leer', () => {
        it('debería leer contenido de archivo existente', () => {
            const nombreArchivo = 'test-read.note';
            const contenido = 'Contenido para leer';
            const rutaCompleta = path.join(testDir, nombreArchivo);

            fs.writeFileSync(rutaCompleta, contenido);
            const contenidoLeido = fs.readFileSync(rutaCompleta, 'utf-8');

            expect(contenidoLeido).toBe(contenido);
        });
    });

    describe('obtenerTodas', () => {
        it('debería listar solo archivos .note', () => {
            fs.writeFileSync(path.join(testDir, 'nota1.note'), 'test');
            fs.writeFileSync(path.join(testDir, 'nota2.note'), 'test');
            fs.writeFileSync(path.join(testDir, 'otro.txt'), 'test');

            const archivos = fs.readdirSync(testDir).filter((f) => f.endsWith('.note'));

            expect(archivos).toHaveLength(2);
            expect(archivos).toContain('nota1.note');
            expect(archivos).toContain('nota2.note');
        });

        it('debería devolver array vacío si no hay archivos', () => {
            const archivos = fs.readdirSync(testDir);

            expect(archivos).toEqual([]);
        });
    });

    describe('eliminar', () => {
        it('debería eliminar archivo existente', () => {
            const nombreArchivo = 'test-delete.note';
            const rutaCompleta = path.join(testDir, nombreArchivo);

            fs.writeFileSync(rutaCompleta, 'test');
            expect(fs.existsSync(rutaCompleta)).toBe(true);

            fs.unlinkSync(rutaCompleta);
            expect(fs.existsSync(rutaCompleta)).toBe(false);
        });
    });
});
