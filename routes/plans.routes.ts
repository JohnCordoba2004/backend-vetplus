import { Router } from "express";

import {
  obtenerPlanes,
  obtenerPlanesPorID,
  obtenerPlanesPorTipo,
  crearPlan,
  actualizarPlan,
  eliminarPlan,
} from "../controllers/plans.controller";

import { upload } from "../middlewares/upload";

const router = Router();

// Base: /api/planes

router.get("/", obtenerPlanes);
router.get("/tipo/:tipo", obtenerPlanesPorTipo);
router.post("/", upload.single("img"), crearPlan); //'img' debe coincidir con el nombre del campo en el formulario
router.get("/:id", obtenerPlanesPorID);
router.put("/:id", actualizarPlan);
router.delete("/:id", eliminarPlan);

export default router;
