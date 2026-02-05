# Documentación OpenAPI - SENIA

Esta carpeta contiene la documentación completa de la API del Sistema de Gestión Educativa SENIA utilizando OpenAPI 3.0.

## Estructura

```
openapi/
├── index.js           # Configuración de Swagger UI
├── openapi.yml        # Especificación OpenAPI completa
├── README.md          # Este archivo
├── paths/             # Definiciones de rutas (para organización futura)
├── responses/         # Respuestas reutilizables (para organización futura)
└── schemas/           # Esquemas de datos (para organización futura)
```

## Acceso a la Documentación

Una vez que inicies el servidor, puedes acceder a la documentación interactiva en:

- **Swagger UI**: https://bartlomiejkrzysztofchudy-dwes-1.onrender.com/api-docs/
- **OpenAPI JSON**: https://bartlomiejkrzysztofchudy-dwes-1.onrender.com/api-docs.json/

## Uso de Swagger UI

### 1. Autenticación

Para probar endpoints protegidos:

1. Usa el endpoint `POST /auth/login` para obtener un token JWT
2. Haz clic en el botón "Authorize" 🔒 en la parte superior derecha
3. Ingresa el token en el formato: `Bearer <tu-token>`
4. Haz clic en "Authorize" y luego en "Close"

### 2. Probar Endpoints

- Expande cualquier endpoint haciendo clic en él
- Haz clic en "Try it out"
- Completa los parámetros requeridos
- Haz clic en "Execute"
- Revisa la respuesta en la sección "Responses"

## Características

### Endpoints Documentados

#### Autenticación
- `POST /auth/login` - Iniciar sesión
- `GET /auth/admin-test` - Ruta de prueba para administradores

#### Administración de Usuarios
- `POST /admin/users` - Crear usuario
- `GET /admin/users` - Listar usuarios (con paginación)

#### Administración de Cursos
- `POST /admin/courses` - Crear curso
- `GET /admin/courses` - Listar cursos

#### Administración de Asignaturas
- `POST /admin/subjects` - Crear asignatura
- `GET /admin/subjects/course/:courseId` - Listar asignaturas por curso

#### Administración de Matrículas
- `POST /admin/enrollments` - Matricular estudiante
- `GET /admin/enrollments/subject/:subjectId` - Listar matrículas por asignatura

### Esquemas de Datos

- **User**: Modelo de usuario con roles (ADMIN, TEACHER, STUDENT)
- **Course**: Modelo de curso
- **Subject**: Modelo de asignatura (con referencias a curso y profesor)
- **Enrollment**: Modelo de matrícula (con referencias a estudiante y asignatura)

## Personalización

El archivo `openapi.yml` sigue la especificación OpenAPI 3.0 y puede ser:

- Importado en herramientas como Postman
- Usado para generar código cliente automáticamente
- Validado con herramientas como Swagger Editor
- Expandido con más endpoints según crezca la API

## Mejores Prácticas

1. **Mantén sincronizada la documentación**: Actualiza `openapi.yml` cuando agregues o modifiques endpoints
2. **Usa ejemplos claros**: Los ejemplos en la documentación ayudan a entender el uso de la API
3. **Documenta todos los códigos de respuesta**: Incluye respuestas exitosas y de error
4. **Agrupa endpoints lógicamente**: Usa tags para organizar endpoints relacionados
5. **Incluye descripciones detalladas**: Explica qué hace cada endpoint y cuándo usarlo

## Expansión Futura

Para proyectos más grandes, considera dividir `openapi.yml` en varios archivos:

```yaml
# openapi.yml (archivo principal)
openapi: 3.0.0
info:
  # ...
paths:
  $ref: './paths/index.yml'
components:
  schemas:
    $ref: './schemas/index.yml'
  responses:
    $ref: './responses/index.yml'
```

Esto hace más manejable la documentación cuando crece el proyecto.

## Recursos

- [Especificación OpenAPI 3.0](https://swagger.io/specification/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [Swagger Editor](https://editor.swagger.io/) - Para editar y visualizar
