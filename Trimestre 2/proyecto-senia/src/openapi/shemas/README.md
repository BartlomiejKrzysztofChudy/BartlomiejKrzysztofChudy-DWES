# Schemas (Esquemas)

Esta carpeta está preparada para almacenar las definiciones de esquemas de datos de forma modular.

## Uso

Divide los esquemas por dominio o modelo:

```
schemas/
├── User.yml           # Esquema de usuario
├── Course.yml         # Esquema de curso
├── Subject.yml        # Esquema de asignatura
├── Enrollment.yml     # Esquema de matrícula
└── Common.yml         # Esquemas comunes (Error, Pagination, etc.)
```

### Ejemplo: User.yml

```yaml
User:
  type: object
  required:
    - name
    - email
    - password
    - role
  properties:
    _id:
      type: string
      example: "697f82c7d7caa6b6652a85ec"
    name:
      type: string
      example: "Juan Pérez"
    # ... resto de las propiedades

UserResponse:
  type: object
  properties:
    # ... propiedades sin el password
```

### Cómo referenciar en openapi.yml

```yaml
components:
  schemas:
    User:
      $ref: './schemas/User.yml#/User'
    UserResponse:
      $ref: './schemas/User.yml#/UserResponse'
```

## Beneficios

- **Reutilización**: Los esquemas pueden usarse en múltiples endpoints
- **Consistencia**: Un solo lugar para definir estructuras de datos
- **Documentación**: Cada esquema está bien documentado con ejemplos
- **Validación**: Los esquemas se usan para validar request/response
