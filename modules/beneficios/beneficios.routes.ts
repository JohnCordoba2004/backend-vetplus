import { Router } from "express";
import * as controller from "./beneficios.controller";
import { validarAdmin, validarJWT } from "../../middlewares/auth.middleware";

const router = Router();

//GET
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Protegidas
// POST
router.post("/", [validarJWT, validarAdmin, controller.create]);

// PuT / PATCH
router.put("/:id", [validarJWT, validarAdmin, controller.update]);
// Opcional:
router.patch("/:id", [validarJWT, validarAdmin, controller.update]);

// DELETE
router.delete("/:id", [validarJWT, validarAdmin, controller.remove]);

export default router;
