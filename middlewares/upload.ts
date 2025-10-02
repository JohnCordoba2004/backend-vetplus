import multer from "multer";
import path from "path";

// Carpeta donde se guardaran las imagenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //carpeta en la raiz del proyecto
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
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
