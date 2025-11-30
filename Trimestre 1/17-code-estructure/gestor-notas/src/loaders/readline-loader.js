import { createInterface } from 'node:readline';

let readlineInterface;

export function initReadline() {
  readlineInterface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return readlineInterface;
}

export function getReadline() {
  if (!readlineInterface) {
    throw new Error('Readline interface not initialized');
  }
  return readlineInterface;
}

export function closeReadline() {
    if (readlineInterface) {
        readlineInterface.close();
    }
}
