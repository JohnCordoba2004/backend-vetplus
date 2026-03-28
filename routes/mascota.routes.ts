import { Router } from "express";
import {
  obtenerMascotas,
  obtenerMascotasPorId,
  crearMascota,
  actualizarMascota,
  eliminarMascota,
} from "../controllers/mascota.controller";

import { validarJWT, validarAdmin } from "../middlewares/auth.middleware";

const router = Router();

// Base: /api/mascota
/* Rutas publicas */
router.get("/", obtenerMascotas);
router.get("/:id", obtenerMascotasPorId);
router.post("/", crearMascota);// -Sin token para el user

// ruta protegida solo para admin
router.put("/:id", [validarJWT, validarAdmin], actualizarMascota);
router.delete("/:id", [validarJWT, validarAdmin], eliminarMascota);

export default router;
