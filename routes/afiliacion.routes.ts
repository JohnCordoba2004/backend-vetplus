import { Router } from "express";
import {
  crearAfiliacion,
  obtenerAfiliacion,
  obtenerEstadisticasAfiliaciones,
} from "../controllers/afiliacion.controller";

const router = Router();

router.get("/", obtenerAfiliacion);
router.post("/", crearAfiliacion);

// Ruta nueva
router.get("/stats", obtenerEstadisticasAfiliaciones);

export default router;
