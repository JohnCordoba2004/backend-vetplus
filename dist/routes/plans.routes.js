"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plans_controller_1 = require("../controllers/plans.controller");
const upload_1 = require("../middlewares/upload");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Base: /api/planes
router.get("/", plans_controller_1.obtenerPlanes);
router.get("/tipo/:tipo", plans_controller_1.obtenerPlanesPorTipo);
router.get("/:id", plans_controller_1.obtenerPlanesPorID);
router.post("/", [auth_middleware_1.validarJWT, auth_middleware_1.validarAdmin, upload_1.upload.single("img")], plans_controller_1.crearPlan);
router.put("/:id", [auth_middleware_1.validarJWT, auth_middleware_1.validarAdmin], plans_controller_1.actualizarPlan);
router.delete("/:id", [auth_middleware_1.validarJWT, auth_middleware_1.validarAdmin], plans_controller_1.eliminarPlan);
exports.default = router;
