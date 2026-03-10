import { Router } from "express";

import {
  obtenerProfesionales,
  obtenerProfesionalesPorId,
  crearProfesionales,
  actualizarProfesionales,
  eliminarProfesionales
} from "../controllers/profesional.controller"
import { validarJWT } from "../middlewares/auth.middleware"; // Importamos tu portero

const router = Router();

//base: /api/profesionales
// --- RUTAS PÚBLICAS (Cualquiera las puede ver) ---
router.get("/", obtenerProfesionales);
router.get("/:id", obtenerProfesionalesPorId);
// --- RUTAS PROTEGIDAS (Solo tú con el Token) ---
// Añadimos [validarJWT] antes del controlador
router.post("/", [validarJWT], crearProfesionales);
router.put("/:id", [validarJWT], actualizarProfesionales);
router.delete("/:id", [validarJWT], eliminarProfesionales);

export default router;