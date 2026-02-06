## README — backend-vetplus (overview)

Este proyecto es un **backend Node.js + Express + TypeScript** que expone endpoints REST y persiste datos en **MongoDB** usando **Mongoose**.

### Estructura (carpetas principales)

- **`server.ts`**: punto de entrada del servidor (Express), middlewares globales, conexión a BD y montaje de rutas.
- **`database.ts`**: conexión a MongoDB (Mongoose).
- **`controllers/`**: lógica de negocio por endpoint (handlers de Express).
- **`routes/`**: definición de rutas (Router) que conecta endpoints con controllers.
- **`models/`**: esquemas y modelos Mongoose (validaciones + estructura de datos).
- **`middlewares/`**: middlewares reutilizables (ej. subida de archivos con multer).
- **`dist/`**: salida compilada a JavaScript (lo que realmente ejecuta Node en producción si apuntas a `dist/server.js`).

### READMEs por carpeta

- `controllers/README.md`
- `routes/README.md`
- `models/README.md`
- `middlewares/README.md`
- `dist/README.md`

---

### Recursos para seguir aprendiendo

- **Node.js**
  - [Documentación oficial](https://nodejs.org/en/learn)
- **Express**
  - [Guía oficial](https://expressjs.com/en/guide/routing.html)
  - [Referencia API](https://expressjs.com/en/4x/api.html)
- **TypeScript**
  - [Handbook (guía oficial)](https://www.typescriptlang.org/docs/handbook/intro.html)
- **HTTP / REST**
  - [HTTP Status Codes (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
  - [Métodos HTTP (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
  - [REST (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/REST)
- **MongoDB / Mongoose**
  - [MongoDB University (cursos gratis)](https://learn.mongodb.com/)
  - [Mongoose docs](https://mongoosejs.com/docs/guide.html)

