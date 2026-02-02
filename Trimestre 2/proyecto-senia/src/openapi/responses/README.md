# Responses (Respuestas)

Esta carpeta está preparada para almacenar definiciones de respuestas reutilizables.

## Uso

Define respuestas comunes que se usan en múltiples endpoints:

```
responses/
├── Success.yml        # Respuestas exitosas comunes
├── Errors.yml         # Respuestas de error comunes
└── Auth.yml           # Respuestas de autenticación
```

### Ejemplo: Errors.yml

```yaml
BadRequest:
  description: Solicitud inválida
  content:
    application/json:
      schema:
        $ref: '../schemas/Common.yml#/Error'
      example:
        error: "Datos inválidos"
        message: "El campo 'email' es requerido"

Unauthorized:
  description: No autenticado
  content:
    application/json:
      schema:
        $ref: '../schemas/Common.yml#/Error'
      example:
        error: "No autenticado"
        message: "Token JWT no proporcionado o inválido"

Forbidden:
  description: No autorizado (sin permisos)
  content:
    application/json:
      schema:
        $ref: '../schemas/Common.yml#/Error'
      example:
        error: "Acceso denegado"
        message: "No tienes permisos para realizar esta acción"

NotFound:
  description: Recurso no encontrado
  content:
    application/json:
      schema:
        $ref: '../schemas/Common.yml#/Error'
      example:
        error: "No encontrado"
        message: "El recurso solicitado no existe"
```

### Cómo referenciar en openapi.yml

```yaml
paths:
  /admin/users:
    get:
      responses:
        '200':
          # Respuesta específica
        '400':
          $ref: './responses/Errors.yml#/BadRequest'
        '401':
          $ref: './responses/Errors.yml#/Unauthorized'
        '403':
          $ref: './responses/Errors.yml#/Forbidden'
```

## Beneficios

- **DRY**: No repetir definiciones de respuestas comunes
- **Consistencia**: Todas las respuestas de error siguen el mismo formato
- **Mantenimiento**: Cambiar una respuesta en un solo lugar
- **Claridad**: Nombres descriptivos para respuestas estándar
