import { Router } from "express";
import {
  obtenerOtros,
  obtenerOtrosPorId,
  crearOtros,
  actualizarOtros,
  eliminarOtros
} from "../controllers/otros.controllers";
import { validarAdmin, validarJWT } from "../middlewares/auth.middleware"; // Importamos tu portero

const router = Router();

// BASE: /api/otros

// --- RUTAS PÚBLICAS (Cualquiera las puede ver) ---
router.get("/", obtenerOtros);
router.get("/:id", obtenerOtrosPorId);

// --- RUTAS PROTEGIDAS (Solo tú con el Token) ---
// Añadimos [validarJWT] antes del controlador
router.post("/", [validarJWT, validarAdmin], crearOtros);
router.put("/:id", [validarJWT, validarAdmin], actualizarOtros);
router.delete("/:id", [validarJWT, validarAdmin], eliminarOtros);

export default router;
