import { Router } from "express";

import {
  obtenerMascotas,
  obtenerMascotasPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
} from "../controllers/mascota.controller";

import { validarJWT } from "../middlewares/auth.middleware";

const router = Router();

// Base: /api/planes
/* Rutas publicas */
router.get("/", obtenerMascotas);
router.get("/:id", obtenerMascotasPorId);

/* Rutas protegidas */
/* Anadimos [validarJTW] antes del controlador */
router.post("/", [validarJWT], crearMascota);
router.put("/:id", [validarJWT], actualizarMascota);
router.delete("/:id", [validarJWT], eliminarMascota);

export default router;
