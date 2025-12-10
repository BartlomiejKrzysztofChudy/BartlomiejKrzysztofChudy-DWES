import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función auxiliar para cargar los archivos YAML
const loadYaml = (filename) => {
  const filePath = path.join(__dirname, filename);
  try {
    return yaml.load(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error cargando el archivo ${filename}:`, error);
    throw error;
  }
};

// Cargamos cada parte de la configuración
const schemas = loadYaml('schemas.yml');
const responses = loadYaml('responses.yml');
const security = loadYaml('security.yml');
const paths = loadYaml('paths.yml');

// Construimos el documento final
export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Gestor de Notas API',
    version: '1.0.0',
    description: 'API para gestionar notas siguiendo el patrón MVC',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Servidor Local',
    },
  ],
  // Aplicamos la seguridad globalmente (Bearer + User Header)
  security: security.security,
  
  // Definimos las rutas
  paths: paths.paths,
  
  // Juntamos todos los componentes
  components: {
    schemas: schemas.components.schemas,
    responses: responses.components.responses,
    securitySchemes: security.components.securitySchemes,
  },
};
