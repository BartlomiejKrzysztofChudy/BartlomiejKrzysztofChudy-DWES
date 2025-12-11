import fs from 'node:fs';
import path from 'node:path';
import { config } from '../../config.js';

const getPath = (noteName) => {
  return path.join(config.notesDirectory, noteName.endsWith('.note') ? noteName : `${noteName}.note`);
};

export const getAll = () => {
  return fs
    .readdirSync(config.notesDirectory)
    .filter(fileName => fileName.endsWith('.note'));
};

export const create = (name, content) => {
  const filePath = getPath(name);
  fs.writeFileSync(filePath, content);
};

export const read = (name) => {
  const filePath = getPath(name);
  return fs.readFileSync(filePath, 'utf8');
};

export const update = (name, content) => {
  const filePath = getPath(name);
  fs.writeFileSync(filePath, content);
};

export const remove = (name) => { 
  const filePath = getPath(name);
  fs.unlinkSync(filePath);
};