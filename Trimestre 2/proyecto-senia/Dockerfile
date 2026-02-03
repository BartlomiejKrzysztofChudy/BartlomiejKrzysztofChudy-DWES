# Dockerfile para API Node.js - Proyecto Seña
FROM node:22-alpine

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci --only=production

# Copiar código fuente
COPY ./src ./src
COPY ./api ./api

# Exponer puerto
EXPOSE 3000

# Usar usuario no privilegiado
USER node

# Comando para iniciar la aplicación
CMD ["node", "src/index.js", "api"]
