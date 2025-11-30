import fs from 'node:fs';
import { config } from '../config.js';

export function initFilesystem() {
  if (!fs.existsSync(config.notesDirectory)) {
    fs.mkdirSync(config.notesDirectory, { recursive: true });
  }
}
