# SENIA – Backend

## Arquitectura Completa Separada por Roles

Este documento define **de forma definitiva y auditada** el backend del sistema **SENIA**, separando claramente **módulos, modelos y responsabilidades por rol**:

* **ADMIN** → define estructura y reglas
* **PROFESOR** → genera datos académicos
* **ALUMNO** → consume información agregada

> ⚠️ Este README integra **todas las correcciones y ajustes** que fueron apareciendo durante el análisis completo de pantallas.
> No hay nada provisional ni omitido.

---

## 📚 Documentación de la API

La API REST está completamente documentada usando **OpenAPI 3.0** (Swagger).

### Acceso a la Documentación

Una vez que inicies el servidor:

```bash
npm start
```

Puedes acceder a la documentación interactiva en:

- **Swagger UI**: http://localhost:3000/api-docs
- **OpenAPI JSON**: http://localhost:3000/api-docs.json

### Características de Swagger UI

✅ Documentación interactiva de todos los endpoints  
✅ Prueba endpoints directamente desde el navegador  
✅ Autenticación JWT integrada  
✅ Esquemas de datos completos con ejemplos  
✅ Códigos de respuesta documentados  
✅ Filtrado y búsqueda de endpoints  

### Cómo usar Swagger UI

1. **Autenticación**: 
   - Usa `POST /auth/login` para obtener tu token JWT
   - Haz clic en el botón "Authorize" 🔒
   - Ingresa: `Bearer <tu-token>`

2. **Probar endpoints**:
   - Expande cualquier endpoint
   - Haz clic en "Try it out"
   - Completa los parámetros
   - Haz clic en "Execute"

3. **Ver respuestas**:
   - Revisa el código de estado
   - Inspecciona el cuerpo de la respuesta
   - Copia el ejemplo para tus pruebas

Para más detalles, consulta [src/openapi/README.md](src/openapi/README.md)

---

## 1. Principios generales del backend

* Node.js + Express
* MongoDB + Mongoose
* API REST
* JWT para autenticación
* Arquitectura por capas:

  * routes → controllers → services → models

### Decisiones clave

* No se guardan medias, porcentajes ni niveles
* Todo lo visible para profesor/alumno se **calcula**
* Control temporal estricto (fechas de matrícula)
* Soft delete en entidades críticas
* Seguridad basada en **rol + pertenencia (Enrollment)**

---

## 2. MODELOS DEL SISTEMA (GLOBAL)

Estos modelos existen **una sola vez** y son compartidos por todos los roles.

### User

```js
{
  name,
  email,
  password,
  role,           // ADMIN | TEACHER | STUDENT
  active,

  preferences: {
    language,
    theme
  },

  notifications: {
    email,
    sound
  },

  createdAt
}
```

---

### Course

```js
{
  name,
  active,
  createdAt
}
```

---

### Subject

```js
{
  name,
  courseId,
  teacherId,
  type,           // TRONCAL | OPTATIVA
  active
}
```

---

### Schedule

```js
{
  subjectId,
  dayOfWeek,
  startTime,
  endTime,
  classroom
}
```

---

### Enrollment

```js
{
  studentId,
  subjectId,
  startDate,
  endDate,
  active
}
```

---

### Attendance

```js
{
  studentId,
  subjectId,
  date,
  status,         // PRESENT | ABSENT | LATE
  createdBy,
  updatedAt
}
```

---

### Evaluation

```js
{
  subjectId,
  name,
  order,
  active
}
```

---

### EvaluationItem

```js
{
  evaluationId,
  name,
  type,           // EXAM | PRACTICE | ATTITUDE | PROJECT | CUSTOM
  weight,
  active
}
```

---

### Grade

```js
{
  studentId,
  subjectId,
  evaluationId,
  itemId,
  value,
  createdBy,
  updatedAt
}
```

---

### Achievement

```js
{
  name,
  description,
  icon,
  conditionType,
  conditionValue,
  active
}
```

---

### UserAchievement

```js
{
  userId,
  achievementId,
  achievedAt
}
```

---

### Announcement

```js
{
  title,
  message,
  authorId,
  targetType,
  targetRoles,
  targetCourses,
  publishedAt,
  expiresAt,
  active
}
```

---

## 3. MÓDULOS Y ENDPOINTS POR ROL

---

## 🔴 ROL ADMIN

### Responsabilidad

* Definir estructura académica
* Gestionar usuarios
* Definir reglas (logros)
* Ver estadísticas globales

### Módulos

* users
* courses
* subjects
* schedules
* achievements
* announcements
* dashboard-admin

### Endpoints

```
GET    /admin/dashboard/summary
GET    /admin/dashboard/students-by-course

GET    /admin/users
POST   /admin/users
PUT    /admin/users/:id
PATCH  /admin/users/:id/disable

GET    /admin/courses
POST   /admin/courses
PUT    /admin/courses/:id
PATCH  /admin/courses/:id/disable

POST   /admin/courses/:courseId/subjects
PUT    /admin/subjects/:id
PATCH  /admin/subjects/:id/assign-teacher

GET    /admin/achievements
POST   /admin/achievements
PUT    /admin/achievements/:id
DELETE /admin/achievements/:id

GET    /admin/announcements
POST   /admin/announcements
```

---

## 🟠 ROL PROFESOR

### Responsabilidad

* Pasar lista
* Evaluar alumnos
* Generar datos académicos

### Módulos

* teacher-dashboard
* attendance
* evaluations
* evaluation-items
* grades

### Endpoints

```
GET    /teacher/dashboard

GET    /teacher/subjects/:subjectId/attendance
POST   /teacher/subjects/:subjectId/attendance
GET    /teacher/subjects/:subjectId/attendance/summary

GET    /teacher/subjects/:subjectId/evaluations
GET    /teacher/evaluations/:evaluationId/items

GET    /teacher/subjects/:subjectId/grades
POST   /teacher/subjects/:subjectId/grades
GET    /teacher/subjects/:subjectId/grades/export
```

---

## 🟢 ROL ALUMNO

### Responsabilidad

* Consultar su progreso
* Ver asistencia y notas
* Visualizar logros

### Módulos

* student-dashboard
* student-attendance
* student-achievements

### Endpoints

```
GET    /student/dashboard
GET    /student/subjects
GET    /student/subjects/:subjectId

GET    /student/attendance?month=&year=
GET    /student/achievements
```

---

## 4. CONFIGURACIÓN (COMÚN A TODOS)

```
PATCH /users/me/password
PATCH /users/me/preferences
PATCH /users/me/notifications
```

---

## 5. DATOS DERIVADOS (NO SE GUARDAN)

* Medias de notas
* % asistencia
* Nivel del alumno
* Progreso de logros

Todo se calcula mediante **services**.

---

## 6. FUTURAS MEJORAS (OBLIGATORIO)

* Configuración global del centro
* Auditoría y logs
* Sistema de permisos dinámicos
* Ranking de alumnos
* Exportación de boletines completos
* Notificaciones en tiempo real
* Caché de agregados
* Motor avanzado de reglas de logros
* API pública

---

## 7. Conclusión

Este backend:

* está completo
* no deja huecos funcionales
* separa correctamente responsabilidades
* está preparado para crecer

Es una **base sólida y profesional** para SENIA.
