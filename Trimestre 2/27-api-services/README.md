## API JSONPlaceholder

Servidor Express que expone un proxy sencillo hacia JSONPlaceholder. Incluye autenticacion por JWT (endpoint de login) y operaciones CRUD basicas sobre posts del placeholder.

### Arranque

```bash
npm install
npm start
# por defecto escucha en http://localhost:3000
```

Variables .env usadas:
- `JWT_SECRET` (opcional, por defecto "secreto")
- `ADMIN_USER` (opcional, por defecto "admin")
- `ADMIN_PASS` (opcional, por defecto "1234")

### Endpoints

Base path: `/api`.

- `POST /api/login` → devuelve JWT con usuario valido.
- `GET /api/placeholder/posts` → lista posts.
- `GET /api/placeholder/posts/:id` → obtiene un post por id.
- `POST /api/placeholder/posts` → crea un post. Body JSON: `{ title, body, userId }`.
- `PUT /api/placeholder/posts/:id` → actualiza un post. Body JSON: `{ title?, body?, userId? }`.
- `DELETE /api/placeholder/posts/:id` → elimina un post.

Nota: JSONPlaceholder no persiste cambios; POST/PUT/DELETE devuelven datos simulados.

### Ejemplos rapidos (PowerShell)

```powershell
# Listar
irm -UseBasicParsing http://localhost:3000/api/placeholder/posts

# Obtener uno
irm -UseBasicParsing http://localhost:3000/api/placeholder/posts/1

# Crear
irm -UseBasicParsing -Method POST `
	-Uri http://localhost:3000/api/placeholder/posts `
	-ContentType "application/json" `
	-Body '{ "title": "nuevo", "body": "texto", "userId": 1 }'

# Actualizar
irm -UseBasicParsing -Method PUT `
	-Uri http://localhost:3000/api/placeholder/posts/1 `
	-ContentType "application/json" `
	-Body '{ "title": "mod", "body": "cambio", "userId": 1 }'

# Borrar
irm -UseBasicParsing -Method DELETE `
	-Uri http://localhost:3000/api/placeholder/posts/1
```
