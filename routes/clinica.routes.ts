import { Router } from "express";

import {
  obtenerClinica,
  obtenerClinicasPorId,
  crearClinica,
  actualizarClinica,
  eliminarClinica,
} from "../controllers/clinica.controller";
import { validarJWT } from "../middlewares/auth.middleware"; // Importamos tu portero

const router = Router();

// Base: /api/planes
// --- RUTAS PÚBLICAS (Cualquiera las puede ver) ---
router.get("/", obtenerClinica);
router.get("/:id", obtenerClinicasPorId);

// --- RUTAS PROTEGIDAS (Solo tú con el Token) ---
// Añadimos [validarJWT] antes del controlador
router.post("/", [validarJWT], crearClinica);
router.put("/:id", [validarJWT], actualizarClinica);
router.delete("/:id", [validarJWT], eliminarClinica);

export default router;
