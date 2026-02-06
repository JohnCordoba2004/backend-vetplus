import { Router } from "express";

import {
  obtenerProfesionales,
  obtenerProfesionalesPorId,
  crearProfesionales,
  actualizarProfesionales,
  eliminarProfesionales
} from "../controllers/profesional.controller"

const router = Router();

//base: /api/profesionales
router.get("/", obtenerProfesionales);
router.get("/:id", obtenerProfesionalesPorId);
router.post("/", crearProfesionales);
router.put("/:id", actualizarProfesionales);
router.delete("/:id", eliminarProfesionales);

export default router;