# ACTIVIDAD 1: DIAGRAMAS DE CASOS DE USO
**Objetivo:** Funcionalidad del sistema y actores.

## 1.1. Diagrama Global del Sistema 
- 📍 **Ubicación:** Repositorio `PI-backend` > Archivo `README.md`.  

## 1.2. Diagramas Individuales (Por Historia de Usuario) 
- 📍 **Ubicación:** Plataforma JIRA (Adjunto dentro de cada tarjeta).

| Historia de Usuario | ID Jira     | Ubicación Exacta              |
|---------------------|-------------|-------------------------------|
| HU1: Iniciar Sesión | BP-5        | Adjunto en ticket BP-5        |
| HU2: Registro Alumno| BP-6        | Adjunto en ticket BP-6        |
| HU3: Gestión Cuentas| BP-7        | Adjunto en ticket BP-7        |
| HU4: Reg. Calificaciones | BP-8   | Adjunto en ticket BP-8        |
| HU5: Pasar Lista    | BP-9        | Adjunto en ticket BP-9        |
| HU6: Dashboard Profe| BP-10       | Adjunto en ticket BP-10       |
| HU7: Exportar Informes | BP-11    | Adjunto en ticket BP-11       |
| HU8: Consultar Notas| BP-12       | Adjunto en ticket BP-12       |
| HU9: Ver Asistencia | BP-13       | Adjunto en ticket BP-13       |
| HU14: Notificaciones| BP-14       | Adjunto en ticket BP-14       |
| HU11: Estadísticas Admin | BP-15  | Adjunto en ticket BP-15       |
| HU12: Gestión Asignaturas | BP-16 | Adjunto en ticket BP-16       |
| HU13: Publicar Anuncios | BP-17   | Adjunto en ticket BP-17       |
| Gamificación (Logros) | BP-62, 63, 64 | Adjuntos en tickets BP-62, 63 y 64 |

---

#  ACTIVIDAD 2: DIAGRAMAS DE ACTIVIDAD
📍 **Ubicación:** Plataforma JIRA (Adjunto dentro de la tarjeta correspondiente).

| Proceso Modelado       | ID Jira | Descripción del Diagrama                                      |
|-------------------------|---------|--------------------------------------------------------------|
| Flujo de Login          | BP-5    | Validación de Hash, JWT y redirección por Rol.               |
| Flujo de Registro       | BP-6    | Validación de Código de Invitación y Transacción en BBDD.    |
| Pasar Lista (Bucle)     | BP-9    | Iteración de alumnos y transacción atómica (Rollback/Commit).|
| Cron Job Gamificación   | BP-63   | Proceso automático nocturno (Reglas de asignación).          |
| Publicación Anuncios    | BP-17   | Creación de anuncio y disparo de notificaciones masivas.     |

---

#  ACTIVIDAD 3: DIAGRAMAS DE SECUENCIA 
📍 **Ubicación:** Plataforma JIRA (Adjunto dentro de la tarjeta correspondiente).

| Interacción Modelada | ID Jira | Descripción del Diagrama                                      |
|-----------------------|---------|--------------------------------------------------------------|
| Autenticación         | BP-5    | Usuario -> React -> API (Bcrypt/JWT) -> DB.                  |
| Carga Dashboard       | BP-10   | Petición GET con cálculos de medias y asistencia en Backend.  |
| Registrar Nota        | BP-8    | Petición POST con validación de datos y escritura en BBDD.    |

---

#  ACTIVIDAD 4: DIAGRAMAS DE COMPONENTES

## 4.1. Arquitectura Frontend (React)
- 📍 **Ubicación:** Repositorio `PI-frontend` > Archivo `README.md`.  

## 4.2. Arquitectura Backend (Node.js)  
- 📍 **Ubicación:** Repositorio `PI-backend` > Archivo `README.md`.  

---

#  ACTIVIDAD 5: DIAGRAMAS JSON
📍 **Ubicación:** Repositorio `PI-backend` > Archivo `README.md`.  


| Estructura JSON   | Descripción                                           |
|-------------------|-------------------------------------------------------|
| Response Login    | Estructura del Token JWT y datos de usuario.          |
| Boletín Notas     | Objeto anidado (Alumno > Asignaturas > Detalles).     |
| Gamificación      | Array de logros obtenidos con fechas e iconos.        |

---

#  ACTIVIDAD 6: DIAGRAMA IE (ENTIDAD-RELACIÓN)

- 📍 **Ubicación:** Repositorio `PI-backend` > Archivo `README.md`.  
