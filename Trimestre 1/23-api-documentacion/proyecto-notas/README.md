# 📝 Proyecto Notas - API RESTful

Sistema de gestión de notas desarrollado con Node.js y Express que permite crear, leer, actualizar y eliminar notas almacenadas como archivos `.note` en el sistema de archivos local.

## 🚀 Características

- ✅ **CRUD completo** de notas (Create, Read, Update, Delete)
- 🔐 **Autenticación** con JWT (JSON Web Tokens)
- 📄 **Paginación** de resultados
- 📤 **Importación** de notas desde archivos
- 📥 **Descarga** de notas individuales
- 📚 **Documentación interactiva** con Swagger/OpenAPI
- 🧪 **Tests unitarios y funcionales** con Vitest
- 🔒 **Middleware de autenticación** personalizado
- 📊 **Cobertura de tests** con Istanbul

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web minimalista
- **ES Modules** - Sintaxis moderna de importación

### Seguridad
- **JWT** (jsonwebtoken) - Autenticación basada en tokens
- **bcryptjs** - Hash de contraseñas

### Documentación
- **Swagger UI Express** - Interfaz interactiva de API
- **js-yaml / yamljs** - Procesamiento de especificaciones OpenAPI

### Testing
- **Vitest** - Framework de testing rápido
- **Supertest** - Testing de APIs HTTP

### Desarrollo
- **ESLint** - Linter con configuración Airbnb
- **dotenv** - Gestión de variables de entorno
- **multer** - Manejo de archivos multipart/form-data

## 📁 Estructura del Proyecto

```
proyecto-notas/
├── src/
│   ├── app.js                    # Configuración de Express
│   ├── config.js                 # Variables de configuración
│   ├── index.js                  # Punto de entrada (API/CLI)
│   ├── controllers/              # Controladores de lógica HTTP
│   │   ├── controlador-api.js
│   │   ├── controlador-auth.js
│   │   └── controlador-consola.js
│   ├── loaders/                  # Inicializadores
│   │   └── index.js
│   ├── middlewares/              # Middlewares personalizados
│   │   ├── auth-middleware.js
│   │   └── upload-middleware.js
│   ├── models/                   # Modelos de datos
│   │   └── modelo-notas.js
│   ├── routes/                   # Definición de rutas
│   │   ├── rutas-auth.js
│   │   └── rutas-notas.js
│   ├── services/                 # Lógica de negocio
│   │   └── servicio-notas.js
│   ├── utils/                    # Utilidades reutilizables
│   │   └── paginacion.js
│   └── openapi/                  # Especificación OpenAPI
│       ├── index.js
│       ├── paths.yml
│       ├── responses.yml
│       ├── schemas.yml
│       └── security.yml
├── test/
│   ├── unitarios/                # Tests unitarios
│   │   ├── modelo-notas.test.js
│   │   ├── paginacion.test.js
│   │   └── servicio-notas.test.js
│   └── funcionales/              # Tests de integración
│       ├── api-notas.test.js
│       └── auth.test.js
├── notas/                        # Directorio de archivos .note
├── coverage/                     # Reportes de cobertura
├── package.json
├── vitest.config.js
└── .env                          # Variables de entorno (no incluido)
```

## 📋 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

## 🔧 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-repositorio>
   cd proyecto-notas
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   JWT_SECRET=tu_clave_secreta_jwt
   ADMIN_USER=admin
   ADMIN_PASS=1234
   ```

4. **Verificar instalación**
   ```bash
   npm run lint
   ```

## 🚀 Uso

### Modo API (Servidor Web)

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`


### Documentación Interactiva

Accede a Swagger UI en: `http://localhost:3000/docs`

## 🔑 Autenticación

### Obtener Token

```bash
POST /api/login
Content-Type: application/json

{
  "usuario": "admin",
  "password": "1234"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usar Token

Incluir el token en el header de las peticiones:
```bash
Authorization: Bearer <tu-token>
```

## 📡 Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/api/login` | Iniciar sesión | No |

### Gestión de Notas

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Listar notas (con paginación) | Sí |
| GET | `/api/notes/:name` | Obtener nota específica | Sí |
| POST | `/api/notes` | Crear nueva nota | Sí |
| PUT | `/api/notes` | Actualizar nota existente | Sí |
| DELETE | `/api/notes/:name` | Eliminar nota | Sí |
| GET | `/api/notes/:name/download` | Descargar nota | Sí |
| POST | `/api/notes/import` | Importar múltiples notas | Sí |

### Parámetros de Paginación

```bash
GET /api/notes?pagina=1&limite=10
```

- `pagina`: Número de página (default: 1)
- `limite`: Elementos por página (default: 10)

## 📝 Ejemplos de Uso

### Crear Nota

```bash
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Mi nota",
  "contenido": "Contenido de la nota"
}
```

### Listar Notas con Paginación

```bash
GET /api/notes?pagina=2&limite=5
Authorization: Bearer <token>
```

**Respuesta:**
```json
{
  "total": 15,
  "totalPaginas": 3,
  "paginaActual": 2,
  "datos": [
    {
      "nombre": "Nota 6",
      "contenido": "...",
      "fechaCreacion": "2025-12-16T10:30:00.000Z",
      "tamaño": 1024
    }
  ]
}
```

### Actualizar Nota

```bash
PUT /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "nombre": "Mi nota",
  "nuevoNombre": "Nota actualizada",
  "contenido": "Nuevo contenido"
}
```

### Eliminar Nota

```bash
DELETE /api/notes/Mi%20nota
Authorization: Bearer <token>
```

### Descargar Nota

```bash
GET /api/notes/Mi%20nota/download
Authorization: Bearer <token>
```

### Importar Notas

```bash
POST /api/notes/import
Authorization: Bearer <token>
Content-Type: multipart/form-data

notas: [archivo1.note, archivo2.note, ...]
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Tests con interfaz visual
npm run test:ui

# Tests con reporte de cobertura
npm run test:coverage
```

### Estructura de Tests

- **Tests Unitarios** (`test/unitarios/`)
  - Modelo de notas
  - Servicio de notas
  - Utilidad de paginación

- **Tests Funcionales** (`test/funcionales/`)
  - API de notas (CRUD completo)
  - Autenticación JWT

### Cobertura de Tests

Los reportes de cobertura se generan en la carpeta `coverage/`:
- `coverage/index.html` - Reporte visual interactivo
- `coverage/lcov.info` - Formato para CI/CD

**Objetivos de cobertura:**
- Statements: 80%
- Branches: 80%
- Functions: 80%
- Lines: 80%

## 🔍 Linting

```bash
# Verificar código
npm run lint

# Corregir automáticamente
npm run lint:fix
```

Configuración basada en **Airbnb JavaScript Style Guide**.

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura en capas**:

1. **Routes** - Define endpoints y rutas HTTP
2. **Controllers** - Maneja peticiones/respuestas HTTP
3. **Services** - Contiene lógica de negocio
4. **Models** - Acceso y manipulación de datos
5. **Middlewares** - Interceptores de peticiones
6. **Utils** - Funciones auxiliares reutilizables

### Patrón de Diseño

- **Separación de responsabilidades**
- **Inyección de dependencias**
- **Middleware pattern**
- **Repository pattern** (para acceso a datos)

## 🔒 Seguridad

- ✅ Autenticación JWT con expiración configurable
- ✅ Hash de contraseñas con bcrypt
- ✅ Validación de tokens en middleware
- ✅ CORS habilitado
- ✅ Variables sensibles en archivo `.env`
- ⚠️ **No usar en producción sin HTTPS**

## 📄 Formato de Archivos .note

Las notas se almacenan como archivos de texto plano con extensión `.note` en la carpeta `notas/`.

**Ejemplo:**
```
Mi nota.note
```

**Contenido:**
```
Este es el contenido de mi nota.
Puede tener múltiples líneas.
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto es parte de un trabajo académico para DWES (Desarrollo Web en Entorno Servidor).

## 👨‍💻 Autor

Bartlomiej Krzysztof Chudy

## 📞 Soporte

Para reportar bugs o solicitar nuevas características, abre un issue en el repositorio.

---

**Nota:** Este proyecto está diseñado con fines educativos. No se recomienda su uso en entornos de producción sin las medidas de seguridad apropiadas.
