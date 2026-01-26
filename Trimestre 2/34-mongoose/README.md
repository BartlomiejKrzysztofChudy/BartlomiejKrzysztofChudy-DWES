## Proyecto: API + SMTP

Servidor Express con dos bloques principales:
- Proxy a JSONPlaceholder (CRUD de posts).
- Envío de emails vía SMTP (MailDev local o Brevo) con endpoint REST y script CLI.

### Arranque

```bash
npm install
npm start  # http://localhost:3000
```

Variables .env clave:
- `JWT_SECRET`, `ADMIN_USER`, `ADMIN_PASS` (login JWT).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` (correo).

### Endpoints

Base `/api`.

- Auth: `POST /api/login` → JWT.
- Placeholder: `GET|POST|PUT|DELETE /api/placeholder/posts[:id]`.
- Email: `POST /api/email/send` → body JSON `{ to, subject, text?, html? }`.

Nota: JSONPlaceholder no persiste; las mutaciones son simuladas.

### Ejemplos rápidos (PowerShell)

```powershell
# Placeholder
irm -UseBasicParsing http://localhost:3000/api/placeholder/posts
irm -UseBasicParsing http://localhost:3000/api/placeholder/posts/1
irm -UseBasicParsing -Method POST -Uri http://localhost:3000/api/placeholder/posts -ContentType "application/json" -Body '{"title":"nuevo","body":"texto","userId":1}'
irm -UseBasicParsing -Method PUT -Uri http://localhost:3000/api/placeholder/posts/1 -ContentType "application/json" -Body '{"title":"mod","body":"cambio","userId":1}'
irm -UseBasicParsing -Method DELETE -Uri http://localhost:3000/api/placeholder/posts/1

# Email (requiere SMTP configurado)
irm -UseBasicParsing -Method POST -Uri http://localhost:3000/api/email/send -ContentType "application/json" -Body '{"to":"dest@ejemplo.com","subject":"Prueba API","text":"Hola"}'
```

### Script CLI de email

```bash
npm run send-email -- dest@ejemplo.com "Asunto" "Texto"
# o usando EMAIL_TO/EMAIL_SUBJECT/EMAIL_TEXT en el entorno
```

### SMTP
- Local pruebas: MailDev (`npx maildev --smtp 1025 --web 1080`, host 127.0.0.1, port 1025, sin auth).
- Brevo: host `smtp-relay.brevo.com`, port 587, user/login SMTP, pass = clave SMTP, FROM debe ser remitente verificado.

### Tests y cobertura
- `npm test` ejecuta 23 tests (unitarios y funcionales). Cobertura ~92% líneas.
- HTML de cobertura: `coverage/index.html`.
