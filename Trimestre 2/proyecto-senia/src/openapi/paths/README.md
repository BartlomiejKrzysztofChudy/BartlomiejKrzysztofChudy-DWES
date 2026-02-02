# Paths (Rutas)

Esta carpeta está preparada para almacenar las definiciones de rutas de forma modular.

## Uso

En lugar de tener todas las rutas en un solo archivo `openapi.yml`, puedes dividirlas por módulo:

```
paths/
├── auth.yml           # Rutas de autenticación
├── users.yml          # Rutas de usuarios
├── courses.yml        # Rutas de cursos
├── subjects.yml       # Rutas de asignaturas
└── enrollments.yml    # Rutas de matrículas
```

### Ejemplo: auth.yml

```yaml
/auth/login:
  post:
    tags:
      - Autenticación
    summary: Iniciar sesión
    # ... resto de la definición
```

### Cómo referenciar en openapi.yml

```yaml
paths:
  /auth/login:
    $ref: './paths/auth.yml#/~1auth~1login'
```

## Beneficios

- **Organización**: Cada módulo en su propio archivo
- **Mantenibilidad**: Más fácil encontrar y actualizar rutas
- **Colaboración**: Varios desarrolladores pueden trabajar en diferentes archivos
- **Reutilización**: Paths comunes pueden ser referenciados
