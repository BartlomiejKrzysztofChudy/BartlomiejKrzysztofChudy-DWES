import { initReadline } from './readline-loader.js';
import { initFilesystem } from './filesystem-loader.js';

export function initLoaders() {
  initFilesystem();
  initReadline();
}
