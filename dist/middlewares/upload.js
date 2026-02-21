"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Carpeta donde se guardaran las imagenes
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); //carpeta en la raiz del proyecto
    },
    filename: (req, file, cb) => {
        // 1. Extraemos la extension(ej:.png)
        const ext = path_1.default.extname(file.originalname);
        // 2.Extraemos el nobre base sin la extension (ej: perrito)
        const nameOnly = path_1.default.basename(file.originalname, ext)
        cb(null, `${Date.now()}-${nameOnly}${ext}`);
    },
});
// Filtrar solo imagenes
const fileFilter = (req, file, cb) => {
    // Creamos una constante que solo permita este tipo de extensiones
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    // Filtramos para saber si nuestra constante allowed contiene archivos con su respectiva extension
    // El mimetype nos permite leer archivos con su respectiva extension asi no nos ingresan archivos daninos 
    if (allowed.includes(file.mimetype)) {
        cb(null, true); //
    } else {
        cb(new Error("Solo se permiten imagenes (jpg, jpeg,  png)"), false);
    }
};
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024
    }, //2 MB
});