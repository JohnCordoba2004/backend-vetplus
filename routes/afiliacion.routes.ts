import { Router } from "express";
import {
  crearAfiliacion,
  obtenerAfiliacion,
} from "../controllers/afiliacion.controller";

const router = Router();

router.get("/", obtenerAfiliacion);
router.post("/", crearAfiliacion);

export default router;
