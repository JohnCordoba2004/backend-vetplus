import { Router } from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import { validarJWT, validarAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", validarJWT, validarAdmin, createUser);
router.get("/", validarJWT, validarAdmin, getUsers);
router.put("/:id", validarJWT, validarAdmin, updateUser);
router.delete("/:id", validarJWT, validarAdmin, deleteUser);

export default router;
