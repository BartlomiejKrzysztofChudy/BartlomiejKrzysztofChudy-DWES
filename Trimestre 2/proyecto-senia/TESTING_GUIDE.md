# Guía Rápida - Testing de la API con Swagger

Esta guía te ayudará a probar rápidamente la API usando Swagger UI.

## Paso 1: Iniciar el Servidor

```bash
npm start
```

El servidor iniciará en `http://localhost:3000`

## Paso 2: Abrir Swagger UI

Navega a: **http://localhost:3000/api-docs**

## Paso 3: Autenticación

### 3.1 Hacer Login

1. Busca el endpoint `POST /auth/login`
2. Haz clic en "Try it out"
3. Ingresa las credenciales:

```json
{
  "email": "admin@ejemplo.com",
  "password": "password123"
}
```

4. Haz clic en "Execute"
5. **Copia el token** de la respuesta (sin las comillas)

### 3.2 Autorizar Swagger

1. Haz clic en el botón **"Authorize" 🔒** (parte superior derecha)
2. En el campo de valor, ingresa: `Bearer <tu-token-aqui>`
   - Ejemplo: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
3. Haz clic en "Authorize"
4. Haz clic en "Close"

✅ Ahora puedes usar todos los endpoints protegidos!

## Paso 4: Probar Endpoints

### Ejemplo 1: Crear un Usuario (ADMIN)

1. Busca `POST /admin/users`
2. Haz clic en "Try it out"
3. Completa el JSON:

```json
{
  "name": "María González",
  "email": "maria.gonzalez@ejemplo.com",
  "password": "password123",
  "role": "TEACHER"
}
```

4. Haz clic en "Execute"
5. Revisa la respuesta (Status 201)

### Ejemplo 2: Listar Usuarios

1. Busca `GET /admin/users`
2. Haz clic en "Try it out"
3. Opcionalmente, ajusta los parámetros de consulta:
   - `page`: 1
   - `limit`: 10
   - `role`: TEACHER
4. Haz clic en "Execute"

### Ejemplo 3: Crear un Curso

1. Busca `POST /admin/courses`
2. Haz clic en "Try it out"
3. Ingresa:

```json
{
  "name": "2º DAW",
  "active": true
}
```

4. Haz clic en "Execute"
5. **Guarda el `_id`** del curso creado

### Ejemplo 4: Crear una Asignatura

1. Busca `POST /admin/subjects`
2. Haz clic en "Try it out"
3. Ingresa (usa IDs reales de tu base de datos):

```json
{
  "name": "Desarrollo Web en Entorno Cliente",
  "course": "697f9c3f1405658893cdb69b",
  "teacher": "697f82c7d7caa6b6652a85ed",
  "type": "TRONCAL"
}
```

4. Haz clic en "Execute"

### Ejemplo 5: Listar Asignaturas por Curso

1. Busca `GET /admin/subjects/course/{courseId}`
2. Haz clic en "Try it out"
3. Ingresa el `courseId` en el campo de parámetro
4. Haz clic en "Execute"

### Ejemplo 6: Matricular un Estudiante

1. Busca `POST /admin/enrollments`
2. Haz clic en "Try it out"
3. Ingresa:

```json
{
  "student": "697f82c7d7caa6b6652a85ec",
  "subject": "697f9c3f1405658893cdb69c"
}
```

4. Haz clic en "Execute"

### Ejemplo 7: Ver Matrículas de una Asignatura

1. Busca `GET /admin/enrollments/subject/{subjectId}`
2. Haz clic en "Try it out"
3. Ingresa el `subjectId` en el campo de parámetro
4. Haz clic en "Execute"

## Códigos de Respuesta Comunes

| Código | Significado | Descripción |
|--------|-------------|-------------|
| 200 | OK | Petición exitosa |
| 201 | Created | Recurso creado exitosamente |
| 400 | Bad Request | Datos inválidos o faltantes |
| 401 | Unauthorized | Token no proporcionado o inválido |
| 403 | Forbidden | No tienes permisos (rol incorrecto) |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej: email duplicado) |
| 500 | Internal Server Error | Error del servidor |

## Consejos

### 🔐 Autenticación Persistente

- Swagger guarda tu token automáticamente
- Si refrescas la página, tendrás que volver a autenticarte

### 🔍 Filtrar Endpoints

- Usa la barra de búsqueda en la parte superior
- Escribe palabras clave como "user", "course", etc.

### 📋 Copiar Respuestas

- Haz clic en "Download" para guardar la respuesta en formato JSON
- Útil para usar IDs en otros endpoints

### 🧪 Probar Errores

Prueba escenarios de error para entender cómo responde la API:

- Enviar datos incompletos → 400
- Usar un token inválido → 401
- Intentar acceder sin ser ADMIN → 403
- Buscar un ID que no existe → 404
- Crear un email duplicado → 409

### 📊 Ver Esquemas

- Haz clic en "Schema" en cualquier request/response
- Te muestra la estructura de datos esperada
- Incluye tipos de datos y campos requeridos

## Workflow Típico

```
1. Login (POST /auth/login)
   ↓
2. Copiar token
   ↓
3. Autorizar en Swagger (botón 🔒)
   ↓
4. Crear Curso (POST /admin/courses)
   ↓ (guardar courseId)
5. Crear Profesor (POST /admin/users con role: TEACHER)
   ↓ (guardar teacherId)
6. Crear Asignatura (POST /admin/subjects)
   ↓ (guardar subjectId)
7. Crear Estudiante (POST /admin/users con role: STUDENT)
   ↓ (guardar studentId)
8. Matricular Estudiante (POST /admin/enrollments)
   ↓
9. Ver Matrículas (GET /admin/enrollments/subject/{subjectId})
```

## Solución de Problemas

### "Failed to fetch"
- Verifica que el servidor esté corriendo
- Revisa la consola del navegador para errores

### "401 Unauthorized"
- Tu token expiró (24 horas)
- Haz login nuevamente
- Autoriza con el nuevo token

### "403 Forbidden"
- Estás usando un usuario sin permisos
- Usa credenciales de ADMIN

### "Cannot read properties of undefined"
- Revisa que estés enviando todos los campos requeridos
- Mira el Schema para ver qué campos son obligatorios

## Exportar a Postman

Si prefieres usar Postman:

1. Ve a http://localhost:3000/api-docs.json
2. Copia el JSON completo
3. En Postman: Import → Paste Raw Text
4. Pega el JSON
5. Tendrás toda la colección importada

## Recursos Adicionales

- [Documentación OpenAPI](src/openapi/README.md)
- [Especificación completa](src/openapi/openapi.yml)
- [README del proyecto](README.md)

---

**¡Disfruta probando la API! 🚀**
