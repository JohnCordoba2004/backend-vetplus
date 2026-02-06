## README — `routes/`

En esta carpeta viven los **routers de Express**. Su trabajo es:

- definir las URLs y métodos HTTP (`GET/POST/PUT/DELETE`)
- y delegar la lógica al **controller** correspondiente.

---

## `clinica.routes.ts`

### Resumen rápido

- **Base mount** (desde `server.ts`): `app.use("/api/clinicas", clinicaRoutes)`
- **Rutas**:
  - `GET /api/clinicas/` → `obtenerClinica`
  - `POST /api/clinicas/` → `crearClinica`
  - `GET /api/clinicas/:id` → `obtenerClinicasPorId`
  - `PUT /api/clinicas/:id` → `actualizarClinica`
  - `DELETE /api/clinicas/:id` → `eliminarClinica`

### Explicación línea por línea

- **L1**: Importa `Router` de Express para crear un sub-router.
- **L2**: Línea en blanco.
- **L3-L9**: Importa handlers desde `../controllers/clinica.controller`.
- **L11**: Crea la instancia `router`.
- **L12**: Línea en blanco.
- **L13**: Comentario (está desactualizado: dice `/api/planes`, pero aquí es `/api/clinicas`).
- **L15**: Define `GET "/"` (cuando se monta, queda `GET /api/clinicas/`).
- **L16-L17**: Rutas comentadas (no activas).
- **L18**: Define `POST "/"` para crear clínica(s).
- **L19**: Define `GET "/:id"` para traer clínica por id.
- **L20**: Define `PUT "/:id"` para actualizar clínica por id.
- **L21**: Define `DELETE "/:id"` para eliminar clínica por id.
- **L22**: Línea en blanco.
- **L23**: Exporta el router como default.

---

## `plans.routes.ts`

### Resumen rápido

- **Base mount** (desde `server.ts`): `app.use("/api/planes", plansRoutes)`
- **Rutas**:
  - `GET /api/planes/` → `obtenerPlanes`
  - `GET /api/planes/tipo/:tipo` → `obtenerPlanesPorTipo`
  - `POST /api/planes/` → `crearPlan` (con `upload.single("img")`)
  - `GET /api/planes/:id` → `obtenerPlanesPorID`
  - `PUT /api/planes/:id` → `actualizarPlan`
  - `DELETE /api/planes/:id` → `eliminarPlan`

### Explicación línea por línea

- **L1**: Importa `Router` de Express.
- **L2**: Línea en blanco.
- **L3-L10**: Importa handlers desde `../controllers/plans.controller`.
- **L12**: Importa middleware `upload` (multer) para manejar subida de archivo.
- **L13**: Línea en blanco.
- **L14**: Crea `router`.
- **L15**: Línea en blanco.
- **L16**: Comentario correcto: base `/api/planes` (porque así se monta en `server.ts`).
- **L18**: `GET "/"` lista planes.
- **L19**: `GET "/tipo/:tipo"` filtra por tipo.
- **L20**: `POST "/"` crea plan y procesa `img` como archivo (`multipart/form-data`).
- **L21**: `GET "/:id"` obtiene plan por id.
- **L22**: `PUT "/:id"` actualiza plan por id.
- **L23**: `DELETE "/:id"` elimina plan por id.
- **L24**: Línea en blanco.
- **L25**: Exporta el router.

---

### Recursos para seguir aprendiendo

- **Express Router**
  - [Router (API reference)](https://expressjs.com/en/4x/api.html#router)
  - [Routing guide](https://expressjs.com/en/guide/routing.html)
- **Manejo de archivos (cuando usas `upload.single(...)`)**
  - [Multer docs](https://github.com/expressjs/multer)
  - [multipart/form-data (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
- **Buenas prácticas REST**
  - [HTTP methods (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
  - [HTTP status codes (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

