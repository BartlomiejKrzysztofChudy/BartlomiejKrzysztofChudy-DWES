import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar el archivo OpenAPI YAML
const openapiDocument = YAML.load(join(__dirname, "openapi.yml"));

/**
 * Configura Swagger UI en la aplicación Express
 * @param {Express} app - Instancia de Express
 */
export const setupSwagger = (app) => {
  // Opciones de personalización para Swagger UI
  const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true, // Mantener el token después de refrescar
      displayRequestDuration: true, // Mostrar duración de las peticiones
      docExpansion: "none", // Colapsar todos los endpoints por defecto
      filter: true, // Habilitar búsqueda
      showExtensions: true,
      showCommonExtensions: true
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 20px 0; }
      .swagger-ui .scheme-container { margin: 20px 0; padding: 20px; background: #fafafa; }
    `,
    customSiteTitle: "SENIA API Documentation"
  };

  // Ruta para la documentación Swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDocument, swaggerOptions));

  // Ruta alternativa para obtener el JSON de OpenAPI
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(openapiDocument);
  });

  console.log("📚 Swagger UI disponible en: http://localhost:3000/api-docs");
  console.log("📄 OpenAPI JSON disponible en: http://localhost:3000/api-docs.json");
};

export default setupSwagger;
