import { Router } from "express";

import {
  obtenerClinica,
  obtenerClinicasPorId,
  crearClinica,
  actualizarClinica,
  eliminarClinica,
} from "../controllers/clinica.controller";

const router = Router();

// Base: /api/planes

router.get("/", obtenerClinica);
// router.get("/tipo/:tipo", obtenerPlanesPorTipo);
// router.post("/", upload.single("img"), crearPlan); //'img' debe coincidir con el nombre del campo en el formulario
router.post("/", crearClinica)
router.get("/:id", obtenerClinicasPorId);
router.put("/:id", actualizarClinica);
router.delete("/:id", eliminarClinica);
router.delete("/:id ", eliminarClinica);

export default router;
