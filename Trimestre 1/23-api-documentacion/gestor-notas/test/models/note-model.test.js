import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { NoteModel } from '../../src/models/note.js';
import { config } from '../../src/config.js';

let tmpDir;

describe('NoteModel', () => {
  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'notes-'));
    config.notesDirectory = tmpDir;
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('creates, reads and deletes a note', () => {
    NoteModel.create('test', 'hello');
    const files = NoteModel.getAll();
    expect(files).toContain('test.note');
    const content = NoteModel.read('test');
    expect(content).toBe('hello');
    NoteModel.delete('test');
    const after = NoteModel.getAll();
    expect(after).not.toContain('test.note');
  });
});
