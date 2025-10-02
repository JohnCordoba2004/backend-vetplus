"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const plans_controller_1 = require("../controllers/plans.controller");
const upload_1 = require("../middlewares/upload");
const router = (0, express_1.Router)();
// Base: /api/planes
router.get("/", plans_controller_1.obtenerPlanes);
router.get("/tipo/:tipo", plans_controller_1.obtenerPlanesPorTipo);
router.post("/", upload_1.upload.single("img"), plans_controller_1.crearPlan); //'img' debe coincidir con el nombre del campo en el formulario
router.get("/:id", plans_controller_1.obtenerPlanesPorID);
router.put("/:id", plans_controller_1.actualizarPlan);
router.delete("/:id", plans_controller_1.eliminarPlan);
exports.default = router;
