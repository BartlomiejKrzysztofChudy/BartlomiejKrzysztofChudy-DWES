import fs from 'node:fs';
import path from 'node:path';
import { config } from '../config.js';

export class NoteModel {
  static getAll() {
    return fs
      .readdirSync(config.notesDirectory)
      .filter(fileName => fileName.endsWith('.note'));
  }

  static getPath(noteName) {
      return path.join(config.notesDirectory, noteName.endsWith('.note') ? noteName : `${noteName}.note`);
  }

  static create(name, content) {
    const filePath = this.getPath(name);
    fs.writeFileSync(filePath, content);
  }

  static read(name) {
      const filePath = this.getPath(name);
      return fs.readFileSync(filePath, 'utf8');
  }

  static update(name, content) {
      const filePath = this.getPath(name);
      fs.writeFileSync(filePath, content);
  }

  static delete(name) {
      const filePath = this.getPath(name);
      fs.unlinkSync(filePath);
  }
}
