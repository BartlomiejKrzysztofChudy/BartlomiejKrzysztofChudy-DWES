import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import fs from 'node:fs';
import path from 'node:path';
import app from '../../src/server.js';
import { config } from '../../config.js';

describe('Import/Export API', () => {
  const testNoteName = 'import-test';
  const testNoteContent = 'This is a test note for import';
  const testNoteName2 = 'import-test-2';
  const testNoteContent2 = 'Another test note';

  beforeEach(() => {
    // Clean up before each test
    if (fs.existsSync(config.notesDirectory)) {
      const files = fs.readdirSync(config.notesDirectory);
      for (const file of files) {
        if (file.endsWith('.note')) {
          fs.unlinkSync(path.join(config.notesDirectory, file));
        }
      }
    } else {
        fs.mkdirSync(config.notesDirectory, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up after each test
    if (fs.existsSync(config.notesDirectory)) {
      const files = fs.readdirSync(config.notesDirectory);
      for (const file of files) {
        if (file.endsWith('.note')) {
          fs.unlinkSync(path.join(config.notesDirectory, file));
        }
      }
    }
  });

  describe('POST /api/notes/import', () => {
    it('should import a single .note file', async () => {
      const buffer = Buffer.from(testNoteContent, 'utf8');
      
      const response = await request(app)
        .post('/api/notes/import')
        .attach('notes', buffer, `${testNoteName}.note`);

      expect(response.status).toBe(201);
      expect(response.body.imported).toContain(`${testNoteName}.note`);

      // Verify file exists
      const filePath = path.join(config.notesDirectory, `${testNoteName}.note`);
      expect(fs.existsSync(filePath)).toBe(true);
      expect(fs.readFileSync(filePath, 'utf8')).toBe(testNoteContent);
    });

    it('should import multiple .note files', async () => {
      const buffer1 = Buffer.from(testNoteContent, 'utf8');
      const buffer2 = Buffer.from(testNoteContent2, 'utf8');

      const response = await request(app)
        .post('/api/notes/import')
        .attach('notes', buffer1, `${testNoteName}.note`)
        .attach('notes', buffer2, `${testNoteName2}.note`);

      expect(response.status).toBe(201);
      expect(response.body.imported).toHaveLength(2);
      expect(response.body.imported).toContain(`${testNoteName}.note`);
      expect(response.body.imported).toContain(`${testNoteName2}.note`);
    });

    it('should ignore files with wrong extension', async () => {
      const buffer = Buffer.from('invalid', 'utf8');

      const response = await request(app)
        .post('/api/notes/import')
        .attach('notes', buffer, 'invalid.txt');

      expect(response.status).toBe(201);
      expect(response.body.errors).toBeDefined();
      expect(response.body.errors[0]).toContain('no tiene extensión .note');
    });
  });

  describe('GET /api/notes/export', () => {
    it('should export a single note as text file', async () => {
      // Create a note first
      fs.writeFileSync(path.join(config.notesDirectory, `${testNoteName}.note`), testNoteContent);

      const response = await request(app)
        .get('/api/notes/export')
        .query({ search: testNoteName }); // Filter to get just this one

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/plain');
      expect(response.headers['content-disposition']).toContain(`filename="${testNoteName}.note"`);
      expect(response.text).toBe(testNoteContent);
    });

    it('should export multiple notes as zip', async () => {
      // Create two notes
      fs.writeFileSync(path.join(config.notesDirectory, `${testNoteName}.note`), testNoteContent);
      fs.writeFileSync(path.join(config.notesDirectory, `${testNoteName2}.note`), testNoteContent2);

      const response = await request(app)
        .get('/api/notes/export');

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/zip');
      expect(response.headers['content-disposition']).toContain('filename="notas.zip"');
      // We can't easily verify zip content in supertest without unzip lib, but status and headers are good indicators.
    });

    it('should return 404 if no notes found', async () => {
      const response = await request(app)
        .get('/api/notes/export');

      expect(response.status).toBe(404);
    });
  });
});
