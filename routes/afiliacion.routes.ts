import { Router } from "express";
import { crearAfiliacion } from "../controllers/afiliacion.controller";

const router = Router();

router.post("/", crearAfiliacion);

export default router;
