## README — `middlewares/`

Middlewares reutilizables de Express.

---

## `upload.ts`

Este middleware usa **multer** para recibir imágenes desde un `multipart/form-data`.

### Resumen rápido

- **Destino**: guarda archivos en `uploads/` (raíz del proyecto).
- **Nombre de archivo**: `${Date.now()}-${file.fieldname}${ext}`
- **Tipos permitidos**: `image/jpeg`, `image/png`, `image/jpg`
- **Límite**: 2MB

### Explicación línea por línea

- **L1**: Importa `multer`.
- **L2**: Importa `path` para sacar la extensión del archivo.
- **L3**: Línea en blanco.
- **L4**: Comentario: carpeta donde se guardarán imágenes.
- **L5**: Crea `storage` con `multer.diskStorage(...)`.
- **L6-L8**: `destination`: define la carpeta `uploads/` como destino.
- **L9-L12**: `filename`: arma el nombre final usando `Date.now()`, `fieldname` y la extensión original.
- **L13**: Cierra `diskStorage`.
- **L14**: Línea en blanco.
- **L15**: Comentario: filtro para aceptar solo imágenes.
- **L16**: Define `fileFilter` (usa `any` para tipar rápido `req/file/cb`).
- **L17**: Lista de mimetypes permitidos.
- **L19-L20**: Si el mimetype está permitido, acepta el archivo (`cb(null, true)`).
- **L21-L23**: Si no, rechaza con error.
- **L24**: Cierra `fileFilter`.
- **L25**: Línea en blanco.
- **L26**: Exporta `upload` configurando `multer({ storage, fileFilter, limits })`.
- **L27-L28**: Pasa `storage` y `fileFilter`.
- **L29**: Límite de tamaño 2MB.
- **L30**: Cierra configuración.

---

### Recursos para seguir aprendiendo

- **Multer**
  - [Repositorio y docs](https://github.com/expressjs/multer)
  - [diskStorage](https://github.com/expressjs/multer#diskstorage)
- **Express Middlewares**
  - [Using middleware](https://expressjs.com/en/guide/using-middleware.html)
- **Seguridad básica en uploads**
  - [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)

