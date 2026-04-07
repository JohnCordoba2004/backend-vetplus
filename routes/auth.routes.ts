import { Router } from "express";
import { login, refreshAccessToken } from "../controllers/auth.controller";
import { validarJWT, validarAdmin } from "../middlewares/auth.middleware";
import {
  crearMascota,
  obtenerMascotas,
} from "../controllers/mascota.controller";

const router = Router();

// Login (para todos)
router.post("/login", login);
router.post("/refresh", refreshAccessToken);

// Rutas de usuario normal (crear mascota)
router.post("/mascota", validarJWT, crearMascota);

// Rutas de administración (solo admin)
router.get("/admin/mascotas", validarJWT, validarAdmin, obtenerMascotas);

export default router;
