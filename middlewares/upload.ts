import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // SEGURIDAD: Limpiamos el nombre de caracteres extraños (puntos extras, espacios, etc)
    const nameOnly = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')           // Cambia espacios por guiones
      .replace(/[^a-zA-Z0-9-]/g, ''); // Solo permite letras, números y guiones

    cb(null, `${Date.now()}-${nameOnly}${ext}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  // SEGURIDAD: También verificamos la extensión real del archivo
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = [".jpg", ".jpeg", ".png"];

  if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    // Esto envía un error claro si alguien intenta subir un .exe o .js
    cb(new Error("Solo se permiten imágenes (jpg, jpeg, png)"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
    files: 1                   // SEGURIDAD: Solo permite 1 archivo a la vez
  },
});