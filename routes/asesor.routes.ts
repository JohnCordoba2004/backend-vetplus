import { Router } from "express";
import {
  crearAsesor,
  obtenerAsesor,
} from "./../controllers/contacto.controller";

const router = Router();

router.get("/", obtenerAsesor);
router.post("/", crearAsesor);

export default router;
