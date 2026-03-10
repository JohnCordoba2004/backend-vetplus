"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        // SEGURIDAD: Limpiamos el nombre de caracteres extraños (puntos extras, espacios, etc)
        const nameOnly = path_1.default.basename(file.originalname, ext)
            .replace(/\s+/g, '-') // Cambia espacios por guiones
            .replace(/[^a-zA-Z0-9-]/g, ''); // Solo permite letras, números y guiones
        cb(null, `${Date.now()}-${nameOnly}${ext}`);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    // SEGURIDAD: También verificamos la extensión real del archivo
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    const allowedExts = [".jpg", ".jpeg", ".png"];
    if (allowedTypes.includes(file.mimetype) && allowedExts.includes(ext)) {
        cb(null, true);
    }
    else {
        // Esto envía un error claro si alguien intenta subir un .exe o .js
        cb(new Error("Solo se permiten imágenes (jpg, jpeg, png)"), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
        files: 1 // SEGURIDAD: Solo permite 1 archivo a la vez
    },
});
