import multer from "multer";
import path from "path";

// Carpeta donde se guardaran las imagenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //carpeta en la raiz del proyecto
  },
  filename: (req, file, cb) => {
    // 1. extraemos la extension (ej: .png)
    const ext = path.extname(file.originalname);
    // 2. Extraemos el nombre base sin la extension
    const nameOnly = path.basename(file.originalname, ext)
    cb(null, `${Date.now()}-${nameOnly}${ext}`);
  },
});

// Filtrar solo imagenes
const fileFilter = (req: any, file: any, cb: any) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];

  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imagenes (jpg, jpeg,  png)"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, //2 MB
});
