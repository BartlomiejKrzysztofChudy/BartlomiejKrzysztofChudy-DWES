# Verificación de Swagger - Checklist

## ✅ Pasos de Verificación

### 1. Verificar Archivos Creados

```bash
# Verifica que existan estos archivos:
ls src/openapi/openapi.yml
ls src/openapi/index.js
ls src/openapi/security.yml
ls src/openapi/README.md
ls TESTING_GUIDE.md
ls SWAGGER_IMPLEMENTATION.md
```

### 2. Verificar Configuración en app.js

```bash
# Verifica que app.js tenga la importación:
grep "setupSwagger" src/app.js
```

Debería mostrar:
```javascript
import setupSwagger from "./openapi/index.js";
```

Y:
```javascript
setupSwagger(app);
```

### 3. Iniciar el Servidor

```bash
npm start
```

**Salida esperada**:
```
📚 Swagger UI disponible en: http://localhost:3000/api-docs
📄 OpenAPI JSON disponible en: http://localhost:3000/api-docs.json
Server running on port 3000
```

### 4. Probar Swagger UI

1. Abre tu navegador
2. Ve a: `http://localhost:3000/api-docs`
3. Deberías ver la interfaz de Swagger UI con:
   - ✅ Título: "Sistema de Gestión Educativa - SENIA"
   - ✅ Botón "Authorize" en la esquina superior derecha
   - ✅ 5 secciones colapsables (tags):
     - Autenticación
     - Admin - Usuarios
     - Admin - Cursos
     - Admin - Asignaturas
     - Admin - Matrículas

### 5. Verificar OpenAPI JSON

```bash
# En PowerShell:
Invoke-RestMethod -Uri http://localhost:3000/api-docs.json | ConvertTo-Json -Depth 10
```

O abre en el navegador: `http://localhost:3000/api-docs.json`

### 6. Probar Autenticación en Swagger

1. En Swagger UI, expande `POST /auth/login`
2. Haz clic en "Try it out"
3. Pega este JSON:
```json
{
  "email": "admin@ejemplo.com",
  "password": "password123"
}
```
4. Haz clic en "Execute"
5. ✅ Deberías ver una respuesta 200 con un token JWT

### 7. Probar Autorización

1. Copia el token de la respuesta anterior (sin comillas)
2. Haz clic en "Authorize" 🔒
3. Ingresa: `Bearer <tu-token>`
4. Haz clic en "Authorize" y luego en "Close"
5. ✅ El candado debería cambiar a cerrado 🔒

### 8. Probar Endpoint Protegido

1. Expande `GET /admin/users`
2. Haz clic en "Try it out"
3. Haz clic en "Execute"
4. ✅ Deberías ver una respuesta 200 con datos de usuarios

### 9. Verificar Búsqueda

1. En el campo de búsqueda superior, escribe "user"
2. ✅ Solo deberían aparecer endpoints relacionados con usuarios

### 10. Verificar Expansión/Colapso

1. Haz clic en "Expand Operations" (si existe)
2. ✅ Todos los endpoints deberían expandirse
3. Haz clic en "Collapse Operations"
4. ✅ Todos los endpoints deberían colapsarse

## 🐛 Solución de Problemas

### Error: "Cannot find module 'yamljs'"

```bash
npm install
```

### Error: "Cannot read openapi.yml"

Verifica que el archivo existe:
```bash
ls src/openapi/openapi.yml
```

### No se muestra Swagger UI

1. Verifica que el servidor esté corriendo
2. Limpia caché del navegador (Ctrl + Shift + R)
3. Revisa la consola del navegador para errores

### Endpoints no aparecen

1. Verifica que `openapi.yml` tenga la sección `paths:`
2. Verifica la sintaxis YAML (indentación correcta)
3. Usa [Swagger Editor](https://editor.swagger.io/) para validar

### Token no funciona (401)

1. Verifica que copiaste el token completo
2. Verifica que incluiste "Bearer " antes del token
3. Verifica que el token no haya expirado (24 horas)

## ✅ Checklist Final

- [ ] Servidor inicia sin errores
- [ ] `/api-docs` carga correctamente
- [ ] `/api-docs.json` devuelve JSON válido
- [ ] Se pueden ver todos los endpoints (9 total)
- [ ] POST /auth/login funciona
- [ ] Botón "Authorize" funciona
- [ ] Se pueden probar endpoints protegidos
- [ ] Las respuestas muestran datos correctos
- [ ] La búsqueda filtra endpoints
- [ ] Los esquemas muestran ejemplos

## 📊 Métricas de Éxito

Si todo funciona correctamente:

- ✅ 9 endpoints documentados
- ✅ 5 tags/grupos
- ✅ Autenticación JWT funcional
- ✅ Testing interactivo disponible
- ✅ Exportable a Postman
- ✅ Cumple estándar OpenAPI 3.0

## 🎉 ¡Todo Listo!

Si todos los checks están marcados, tu documentación Swagger está completamente funcional.

**Siguiente paso**: Comienza a documentar las rutas de profesor y estudiante siguiendo el mismo patrón.

---

**Documentación creada para el proyecto SENIA** 🚀
**Fecha**: Febrero 2026
