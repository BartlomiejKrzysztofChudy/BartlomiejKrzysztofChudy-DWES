import 'dotenv/config'; 
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  notesDirectory: path.join(__dirname, '../notas'),
  
  security: {
    adminName: process.env.ADMIN_NAME, 
    tokenHash: process.env.SECRET_TOKEN_HASH 
  }
};