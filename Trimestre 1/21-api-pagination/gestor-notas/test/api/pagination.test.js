import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import app from '../../src/server.js';
import { config } from '../../src/config.js';

let tmpDir;

describe('API Pagination, Filtering & Sorting', () => {
  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'notes-pagination-'));
    config.notesDirectory = tmpDir;
    
    // Create dummy notes for testing
    fs.writeFileSync(path.join(tmpDir, 'apple.note'), 'Apple content');
    fs.writeFileSync(path.join(tmpDir, 'banana.note'), 'Banana content');
    fs.writeFileSync(path.join(tmpDir, 'cherry.note'), 'Cherry content');
    fs.writeFileSync(path.join(tmpDir, 'date.note'), 'Date content');
    fs.writeFileSync(path.join(tmpDir, 'elderberry.note'), 'Elderberry content');
  });

  afterEach(() => {
    if (tmpDir && fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });

  it('GET /api/notes returns paginated results (default limit 10)', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(5);
    expect(response.body.meta.total).toBe(5);
    expect(response.body.meta.page).toBe(1);
  });

  it('GET /api/notes?limit=2 returns only 2 results', async () => {
    const response = await request(app).get('/api/notes?limit=2');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(response.body.meta.totalPages).toBe(3); // 5 items / 2 per page = 3 pages
  });

  it('GET /api/notes?page=2&limit=2 returns the next 2 results', async () => {
    // Default sort is asc: apple, banana, cherry, date, elderberry
    // Page 1: apple, banana
    // Page 2: cherry, date
    const response = await request(app).get('/api/notes?page=2&limit=2');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(['cherry.note', 'date.note']);
  });

  it('GET /api/notes?search=app filters results', async () => {
    const response = await request(app).get('/api/notes?search=app');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(['apple.note']);
    expect(response.body.meta.total).toBe(1);
  });

  it('GET /api/notes?sort=desc sorts results descending', async () => {
    const response = await request(app).get('/api/notes?sort=desc');
    expect(response.status).toBe(200);
    // elderberry, date, cherry, banana, apple
    expect(response.body.data[0]).toBe('elderberry.note');
    expect(response.body.data[4]).toBe('apple.note');
  });

  it('GET /api/notes combines search, sort and pagination', async () => {
    // Search 'e' -> apple, cherry, date, elderberry (banana has no 'e'?) wait banana has no e.
    // apple, cherry, date, elderberry.
    // Sort desc -> elderberry, date, cherry, apple.
    // Page 1, limit 2 -> elderberry, date.
    
    const response = await request(app).get('/api/notes?search=e&sort=desc&page=1&limit=2');
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(['elderberry.note', 'date.note']);
  });
});
