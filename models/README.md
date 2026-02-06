## README — `models/`

Aquí están los **Schemas/Models de Mongoose**:

- Definen la **forma** de los documentos en MongoDB.
- Incluyen **validaciones** (required, minlength, enum, etc.).
- Exportan un **modelo** (`model(...)`) que se usa en los controllers para hacer CRUD.

---

## `Clinica.ts`

> Ojo: el archivo se llama `Clinica.ts`, pero el interface se llama `IPlan` y el schema se llama `PlanSchema`. Aun así, el modelo exportado es `"Clinica"`.

### Resumen rápido

- **Colección/modelo**: `model<IPlan>("Clinica", PlanSchema)`
- **Campos**:
  - `name`: string requerido.
  - `direction`: array de strings requerido (mínimo 1).
  - `phone`: array de strings requerido (mínimo 1).
  - `celular`: array de strings requerido (mínimo 1).
  - `webs`: array de strings opcional (valida URLs si vienen).
  - `city`: string requerido.

### Explicación línea por línea

- **L1**: Importa `Schema`, `model`, `Document` desde Mongoose.
- **L2**: Línea en blanco.
- **L3-L10**: Define la interfaz TypeScript `IPlan` (tipa la forma del documento).
- **L12**: Crea `PlanSchema` como `new Schema<IPlan>(...)`.
- **L13-L18**: Campo `name` con validaciones: required, trim, minlength.
- **L19-L26**: Campo `direction` como `type: [String]`, requerido y con validator (mínimo 1).
- **L27-L34**: Campo `phone` similar: array requerido + validator.
- **L35-L42**: Campo `celular` similar: array requerido + validator.
- **L43-L60**: Campo `webs`:
  - **L44-L45**: es array de strings, default `[]` (opcional).
  - **L46-L59**: validator: permite vacío y valida URLs cuando hay contenido.
- **L61-L66**: Campo `city` requerido con trim + minlength.
- **L67**: Cierra el schema.
- **L69**: Exporta el modelo Mongoose llamado `"Clinica"`.

---

## `Plan.ts`

### Resumen rápido

- **Colección/modelo**: `model<IPlan>("Plan", PlanSchema)`
- **Campos**:
  - `type`: `"dog" | "cat"` (enum, requerido)
  - `name`: string requerido (nota: hay un typo en `minlenght`)
  - `desc`, `descName`, `descPrice`: string requerido, minlength 20
  - `benefits`: string[] requerido (mínimo 1)
  - `price`: number requerido (min 1000)
  - `img`: string requerido (valida URL)

### Explicación línea por línea

- **L1**: Importa `Schema`, `model`, `Document`.
- **L2**: Línea en blanco.
- **L3-L12**: Interface `IPlan` define los campos esperados del documento.
- **L14**: Crea `PlanSchema`.
- **L15-L19**: Campo `type` con enum `dog/cat` y required.
- **L20-L25**: Campo `name` requerido. (Nota: en **L24** dice `minlenght`, debería ser `minlength`).
- **L26-L31**: Campo `desc` requerido y minlength 20.
- **L32-L37**: Campo `descName` requerido y minlength 20.
- **L38-L43**: Campo `descPrice` requerido y minlength 20.
- **L44-L51**: Campo `benefits` como array requerido con validator (mínimo 1).
- **L52-L56**: Campo `price` number requerido con mínimo 1000.
- **L57-L64**: Campo `img` requerido y validator de URL.
- **L65**: Cierra schema.
- **L67**: Exporta modelo `"Plan"`.

---

### Recursos para seguir aprendiendo

- **Mongoose (schemas, tipos y validación)**
  - [Schemas](https://mongoosejs.com/docs/guide.html)
  - [SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
  - [Validation](https://mongoosejs.com/docs/validation.html)
  - [Models](https://mongoosejs.com/docs/models.html)
- **MongoDB (modelado de datos)**
  - [MongoDB University](https://learn.mongodb.com/)
- **TypeScript (interfaces y tipos)**
  - [Interfaces](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces)

