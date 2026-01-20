import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const baseDir = path.dirname(__filename);

function loadYaml(relativePath) {
    const filePath = path.join(baseDir, relativePath);
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
}

export function getOpenApiSpec() {
    const schemas = loadYaml('schemas.yml');
    const responses = loadYaml('responses.yml');
    const security = loadYaml('security.yml');
    const paths = loadYaml('paths.yml');

    return {
        openapi: '3.0.3',
        info: schemas.info,
        servers: [{ url: '/' }],
        paths: paths.paths,
        components: {
            securitySchemes: security.components.securitySchemes,
            schemas: schemas.components.schemas,
            responses: responses.components.responses,
        },
    };
}
