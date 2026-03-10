"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarPlan = exports.actualizarPlan = exports.crearPlan = exports.obtenerPlanesPorTipo = exports.obtenerPlanesPorID = exports.obtenerPlanes = void 0;
const Plan_1 = __importDefault(require("../models/Plan"));
// Obtener todos los planes
const obtenerPlanes = async (req, res) => {
    try {
        const planes = await Plan_1.default.find();
        res.json(planes);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los planes" });
    }
};
exports.obtenerPlanes = obtenerPlanes;
// Obtener los planes por id
const obtenerPlanesPorID = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan_1.default.findById(id);
        if (!plan)
            return res.status(404).json({ error: "Plan no encontrado" });
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el plan por ID" });
    }
};
exports.obtenerPlanesPorID = obtenerPlanesPorID;
// obtener por tipo (dog o cat)
const obtenerPlanesPorTipo = async (req, res) => {
    try {
        const { tipo } = req.params;
        const planes = await Plan_1.default.find({ type: tipo });
        res.json(planes);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el plan por tipo" });
    }
};
exports.obtenerPlanesPorTipo = obtenerPlanesPorTipo;
// crear un nuevo plan
// crear uno o varios planes
const crearPlan = async (req, res) => {
    try {
        const data = req.body;
        // Si mandas un array [], usamos insertMany. Si es uno solo {}, usamos save().
        if (Array.isArray(data)) {
            const nuevosPlanes = await Plan_1.default.insertMany(data);
            return res.status(201).json(nuevosPlanes);
        }
        const nuevoPlan = new Plan_1.default(data);
        await nuevoPlan.save();
        res.status(201).json(nuevoPlan);
    }
    catch (error) {
        if (error.name === "ValidationError" || error.name === "BulkWriteError") {
            return res.status(400).json({
                error: "Validación fallida",
                detalles: error.message
            });
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.crearPlan = crearPlan;
// ACTUALIZAR (Corregido y optimizado)
const actualizarPlan = async (req, res) => {
    try {
        const { id } = req.params;
        // Quitamos el filtro "allowed" para que puedas editar cualquier campo del modelo
        const planActualizado = await Plan_1.default.findByIdAndUpdate(id, req.body, {
            new: true, // Devuelve el documento ya editado
            runValidators: true, // Asegura que los cambios cumplan con el Schema
        });
        if (!planActualizado) {
            return res.status(404).json({ error: "Plan no encontrado para actualizar" });
        }
        return res.json(planActualizado);
    }
    catch (error) {
        if (error.name === "ValidationError") {
            const mensajes = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ error: "Validación fallida", mensajes });
        }
        console.error("Error al actualizar plan:", error);
        res.status(500).json({ error: "Error al actualizar el plan" });
    }
};
exports.actualizarPlan = actualizarPlan;
// Eliminar plan por ID
const eliminarPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan_1.default.findByIdAndDelete(id);
        if (!plan)
            return res.status(404).json({ error: "Plan no encontrado" });
        res.status(200).json({
            ok: true,
            mensaje: "Plan eliminado correctamente",
            plan: plan,
        });
    }
    catch (error) {
        console.error("Error eliminar plan:", error);
        res.status(500).json({ error: "Error al eliminar el plan" });
    }
};
exports.eliminarPlan = eliminarPlan;
