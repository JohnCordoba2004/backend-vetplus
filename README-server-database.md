## README — `server.ts` y `database.ts` (explicación)

Este archivo existe para complementar los READMEs por carpeta con una explicación directa de los entrypoints del proyecto.

---

## `server.ts`

### Resumen rápido

- Carga variables de entorno (`dotenv`).
- Crea app Express + middlewares (`cors`, `express.json()`).
- Conecta a MongoDB (`connectDB()`).
- Monta rutas:
  - `/api/planes`
  - `/api/clinicas`
- Sirve archivos estáticos en `/uploads`.
- Levanta el servidor en `PORT`.

### Explicación línea por línea

- **L1**: Log de inicio (útil para ver que el proceso arrancó).
- **L2**: Línea en blanco.
- **L3**: Importa `express`.
- **L4**: Importa `path` (para construir ruta del folder `uploads`).
- **L5**: Importa `cors` (habilita CORS).
- **L6**: Importa `dotenv` (lee `.env`).
- **L7**: Importa `connectDB` (conexión a MongoDB).
- **L9-L10**: Importa routers de planes y clínicas.
- **L12**: Ejecuta `dotenv.config()` para cargar variables de entorno.
- **L13**: Log de debug.
- **L15**: Crea la app Express: `const app = express()`.
- **L16**: Log de debug.
- **L18**: Comentario: sección de middlewares.
- **L19**: `app.use(cors())` habilita CORS para peticiones del frontend.
- **L20**: `app.use(express.json())` permite leer JSON en `req.body`.
- **L22**: Comentario: conexión Mongo.
- **L23-L24**: Log + llamada a `connectDB()`.
- **L26**: Comentario: rutas.
- **L27**: Monta rutas de planes en `/api/planes`.
- **L28**: Monta rutas de clínicas en `/api/clinicas`.
- **L29**: Sirve estáticos desde la carpeta `uploads` cuando se pide `/uploads/...`.
- **L31**: Define `PORT` usando `process.env.PORT` o `3000`.
- **L32-L34**: `app.listen` levanta el servidor y loguea la URL.

---

## `database.ts`

### Resumen rápido

Define `connectDB()` que usa `mongoose.connect(uri)` y:

- si conecta: log ✅
- si falla: log ❌ y cierra el proceso con `process.exit(1)`

### Explicación línea por línea

- **L1**: Importa `mongoose`.
- **L4**: Exporta `connectDB()` como función async.
- **L5**: Abre `try`.
- **L6**: Lee `MONGO_URI` desde variables de entorno (o `""`).
- **L7**: Conecta a Mongo con `mongoose.connect(uri)`.
- **L8**: Log de conexión exitosa.
- **L9**: Abre `catch` si falla.
- **L10**: Log del error.
- **L11**: `process.exit(1)` termina el proceso (para no dejar el servidor “vivo” sin BD).
- **L12-L13**: Cierra `catch` y función.

---

### Recursos para seguir aprendiendo

- **dotenv / variables de entorno**
  - [dotenv (npm)](https://www.npmjs.com/package/dotenv)
  - [process.env (Node.js)](https://nodejs.org/api/process.html#processenv)
- **MongoDB**
  - [Connection string (docs)](https://www.mongodb.com/docs/manual/reference/connection-string/)
  - [MongoDB University (cursos gratis)](https://learn.mongodb.com/)
- **Mongoose**
  - [Connections](https://mongoosejs.com/docs/connections.html)
  - [Models](https://mongoosejs.com/docs/models.html)
- **Express**
  - [Using middleware](https://expressjs.com/en/guide/using-middleware.html)
  - [Serving static files](https://expressjs.com/en/starter/static-files.html)
- **HTTP**
  - [HTTP status codes (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

