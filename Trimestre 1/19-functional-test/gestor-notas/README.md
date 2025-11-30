# Gestor de notas (CLI)

Aplicación de consola estructurada siguiendo el patrón MVC adaptado al material de DWES. Permite crear, editar y eliminar notas almacenadas como ficheros `.note` en la carpeta configurada.

## Estructura

```
.
├── src
│   ├── app.js
│   ├── config.js
│   ├── controllers
│   ├── loaders
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
├── test
│   ├── controllers
│   ├── loaders
│   ├── models
│   ├── routes
│   ├── services
│   └── utils
└── package.json
```

Cada carpeta replica los ejemplos del documento de referencia:
- `loaders`: inicializa dependencias de una sola vez (readline, carpetas).
- `routes`: asocia comandos del usuario con controladores.
- `controllers`: lógica de negocio y flujo de la aplicación.
- `services`: interacción con el sistema de ficheros.
- `models`: definición del dominio (nota).
- `utils`: utilidades reutilizables (logger, helpers de entrada).

## Uso

```bash
npm install
npm start
```

Opcionalmente, ejecuta en modo watch:

```bash
npm run dev
```

### Variables de entorno (opcional)

La aplicación usa por defecto la carpeta `./notas` en la raíz del proyecto. Si quieres cambiarlo,
exporta la variable `NOTES_DIRECTORY` antes de ejecutar `npm start`.

## Tests

Los tests siguen la misma jerarquía que `src` y se ejecutan con:

```bash
npm test
```
