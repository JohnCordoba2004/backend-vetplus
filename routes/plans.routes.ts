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
// router.post("/", upload.single("img"), crearPlan); //'img' debe coincidir con el nombre del campo en el formulario
router.post("/", [validarJWT, validarAdmin, upload.single("img")], crearPlan);
router.get("/:id", obtenerPlanesPorID);
router.put("/:id", [validarJWT, validarAdmin], actualizarPlan);
router.delete("/:id", [validarJWT, validarAdmin], eliminarPlan);

export default router;
