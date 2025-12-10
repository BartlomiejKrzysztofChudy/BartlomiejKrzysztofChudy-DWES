import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import app from '../../src/server.js';
import { config } from '../../src/config.js';

let tmpDir;

describe('Notes API', () => {
  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'notes-api-'));
    config.notesDirectory = tmpDir;
  });

  afterEach(() => {
    if (tmpDir && fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('GET /api/notes returns empty list initially', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([]);
    expect(response.body.meta.total).toBe(0);
  });

  it('POST /api/notes creates a new note', async () => {
    const newNote = { name: 'todo', content: 'Buy milk' };
    const response = await request(app).post('/api/notes').send(newNote);
    
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Nota creada', name: 'todo' });

    const listResponse = await request(app).get('/api/notes');
    expect(listResponse.body.data).toContain('todo.note');
  });

  it('POST /api/notes returns 400 if name is missing', async () => {
    const response = await request(app).post('/api/notes').send({ content: 'No name' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('GET /api/notes/:name returns note content', async () => {
    fs.writeFileSync(path.join(tmpDir, 'test.note'), 'Hello World');

    const response = await request(app).get('/api/notes/test');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: 'test', content: 'Hello World' });
  });

  it('PATCH /api/notes/:name appends content', async () => {
    fs.writeFileSync(path.join(tmpDir, 'log.note'), 'Start');

    const response = await request(app).patch('/api/notes/log').send({ content: '\nEnd' });
    expect(response.status).toBe(200);

    const content = fs.readFileSync(path.join(tmpDir, 'log.note'), 'utf8');
    expect(content).toBe('Start\nEnd');
  });

  it('DELETE /api/notes/:name deletes the note', async () => {
    fs.writeFileSync(path.join(tmpDir, 'temp.note'), 'Delete me');

    const response = await request(app).delete('/api/notes/temp');
    expect(response.status).toBe(200);

    expect(fs.existsSync(path.join(tmpDir, 'temp.note'))).toBe(false);
  });
  
  it('Handles errors gracefully (e.g. reading non-existent note)', async () => {
      const response = await request(app).get('/api/notes/nonexistent');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
  });

  it('PATCH /api/notes/:name returns 400 if content is missing', async () => {
    const response = await request(app).patch('/api/notes/test').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('GET /api/notes/:name works if name already has .note extension', async () => {
    fs.writeFileSync(path.join(tmpDir, 'ext.note'), 'Extension');
    const response = await request(app).get('/api/notes/ext.note');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ name: 'ext.note', content: 'Extension' });
  });
});
