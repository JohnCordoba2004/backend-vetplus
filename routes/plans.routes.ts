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
import { validarAdmin, validarJWT } from "../middlewares/auth.middleware";

const router = Router();

// Base: /api/planes

router.get("/", obtenerPlanes);
router.get("/tipo/:tipo", obtenerPlanesPorTipo);
router.get("/:id", obtenerPlanesPorID);
router.post("/", [validarJWT, validarAdmin, upload.single("img")], crearPlan);
router.put("/:id", [validarJWT, validarAdmin], actualizarPlan);
router.delete("/:id", [validarJWT, validarAdmin], eliminarPlan);

export default router;
