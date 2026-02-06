import { Router } from "express";

import {
  obtenerOtros,
  obtenerOtrosPorId,
  crearOtros,
  actualizarOtros,
  eliminarOtros
} from "../controllers/otros.controllers"

const router = Router()

//base: /api/profesionales
router.get("/", obtenerOtros)
router.get("/:id", obtenerOtrosPorId)
router.post("/", crearOtros)
router.put("/:id", actualizarOtros)
router.delete("/:id", eliminarOtros)
export default router;
