import { Router } from "express";

import {
  obtenerProfesionales,
  obtenerProfesionalesPorId,
  crearProfesionales,
  actualizarProfesionales,
  eliminarProfesionales
} from "../controllers/profesional.controller"
import { validarAdmin, validarJWT } from "../middlewares/auth.middleware"; // Importamos tu portero

const router = Router();

//base: /api/profesionales
// --- RUTAS PÚBLICAS (Cualquiera las puede ver) ---
router.get("/", obtenerProfesionales);
router.get("/:id", obtenerProfesionalesPorId);
// --- RUTAS PROTEGIDAS (Solo tú con el Token) ---
// Añadimos [validarJWT] antes del controlador
router.post("/", [validarJWT, validarAdmin], crearProfesionales);
router.put("/:id", [validarJWT, validarAdmin], actualizarProfesionales);
router.delete("/:id", [validarJWT, validarAdmin], eliminarProfesionales);

export default router;
