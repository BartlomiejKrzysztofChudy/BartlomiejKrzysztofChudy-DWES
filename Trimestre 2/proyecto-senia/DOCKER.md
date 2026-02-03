# 🐳 Guía de Docker - Proyecto Seña

## 📋 Requisitos previos

- Docker Desktop instalado
- Docker Compose v3.8 o superior
- Archivo `.env` configurado (copiar desde `.env.example`)

## 🚀 Inicio rápido

### 1. Configurar variables de entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales de MongoDB Atlas
```

### 2. Construir y levantar el contenedor

```bash
# Construir la imagen y levantar el contenedor
docker-compose up -d

# Ver logs en tiempo real
docker-compose logs -f api

# Ver estado del contenedor
docker-compose ps
```

### 3. Verificar el servicio

```bash
# La API estará disponible en:
# http://localhost:3000

# Swagger UI:
# http://localhost:3000/api-docs
```

## 🛠️ Comandos útiles

### Gestión del contenedor

```bash
# Detener el contenedor
docker-compose down

# Reconstruir la imagen (después de cambios en Dockerfile o dependencias)
docker-compose up -d --build

# Ver logs
docker-compose logs -f api

# Acceder al contenedor
docker-compose exec api sh
```

### Limpieza

```bash
# Detener y eliminar contenedores, redes
docker-compose down

# Eliminar también volúmenes
docker-compose down -v

# Limpiar imágenes no utilizadas
docker image prune -a
```

## 📁 Estructura Docker

```
proyecto-senia/
├── Dockerfile              # Definición de la imagen
├── docker-compose.yml      # Orquestación de servicios
├── .dockerignore          # Archivos excluidos de la imagen
└── .env                   # Variables de entorno (no versionado)
```

## 🔧 Desarrollo vs Producción

### Modo Desarrollo (con hot-reload)

El `docker-compose.yml` incluye volumes que montan el código fuente:

```yaml
volumes:
  - ./src:/usr/src/app/src
  - ./api:/usr/src/app/api
```

Esto permite ver cambios en tiempo real sin reconstruir la imagen.

### Modo Producción

Para producción, comenta los volumes en `docker-compose.yml`:

```yaml
# volumes:
#   - ./src:/usr/src/app/src
#   - ./api:/usr/src/app/api
```

Y reconstruye la imagen:

```bash
docker-compose up -d --build
```

## 🔍 Troubleshooting

### El contenedor no inicia

```bash
# Ver logs detallados
docker-compose logs api

# Verificar configuración
docker-compose config
```

### Problemas de red

```bash
# Inspeccionar la red
docker network inspect proyecto-senia-network

# Forzar desconexión
docker network disconnect -f proyecto-senia-network [container_id]

# Limpiar redes no utilizadas
docker network prune
```

### Puerto ocupado

```bash
# Cambiar el puerto en .env
PORT=3001

# O especificarlo al levantar
PORT=3001 docker-compose up -d
```

## 📊 Healthcheck

El contenedor incluye un healthcheck que verifica cada 30 segundos:

```bash
# Ver estado de salud
docker-compose ps

# Ver detalles del healthcheck
docker inspect --format='{{json .State.Health}}' proyecto-senia-api
```

## 🌐 Variables de entorno

| Variable | Descripción | Requerida | Default |
|----------|-------------|-----------|---------|
| `NODE_ENV` | Entorno de ejecución | No | `production` |
| `PORT` | Puerto del servidor | No | `3000` |
| `MONGODB_URI` | URL de conexión MongoDB | **Sí** | - |
| `JWT_SECRET` | Secreto para JWT | **Sí** | - |

## 🔐 Seguridad

- La imagen usa `node:22-alpine` (ligera y segura)
- Ejecuta como usuario no privilegiado (`USER node`)
- Instala solo dependencias de producción (`--only=production`)
- Excluye archivos sensibles (`.dockerignore`)

## 📦 Tamaño de la imagen

```bash
# Ver tamaño de la imagen
docker images | grep proyecto-senia

# Aproximadamente: ~150-200 MB (Alpine base)
```

## 🚢 Despliegue

### Docker Hub

```bash
# Etiquetar imagen
docker tag proyecto-senia-api:latest usuario/proyecto-senia:v1.0.0

# Subir a Docker Hub
docker push usuario/proyecto-senia:v1.0.0
```

### Registry privado

```bash
# Etiquetar para registry privado
docker tag proyecto-senia-api:latest registry.example.com/proyecto-senia:latest

# Subir
docker push registry.example.com/proyecto-senia:latest
```

## 📝 Notas adicionales

- MongoDB Atlas está en la nube, no necesita contenedor local
- Los scripts de seed deben ejecutarse fuera del contenedor
- Para desarrollo local completo, considera usar MongoDB local en otro contenedor
