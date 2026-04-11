import { Router } from "express";
import * as controller from "./plan.controller";
import { validarAdmin, validarJWT } from "../../middlewares/auth.middleware";

const router = Router();

//GET
router.get("/", controller.getAll);
router.get("/:id", controller.getById);

// Protegidas
//Post
router.post("/", [validarJWT, validarAdmin, controller.create]);
// Put
router.put("/:id", [validarJWT, validarAdmin, controller.update]);
// Opcional: Patch
router.patch("/:id", [validarJWT, validarAdmin, controller.update]);
//Delete
router.patch("/:id", [validarJWT, validarAdmin, controller.remove]);

export default router;
