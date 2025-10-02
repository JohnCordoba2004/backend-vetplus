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
        res.json(plan); //✅DEvulve el plan
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el plan por ID" });
    }
};
exports.obtenerPlanesPorID = obtenerPlanesPorID;
// 🔍 obtener por tipo (dog o cat)
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
const crearPlan = async (req, res) => {
    try {
        const { type, name, benefits, price, img } = req.body;
        const nuevoPlan = new Plan_1.default({ type, name, benefits, price, img });
        await nuevoPlan.save();
        res.status(201).json(nuevoPlan);
    }
    catch (error) {
        if (error.name === "ValidationError") {
            const mensajes = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                error: "Validacion fallida",
                mensajes,
            });
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.crearPlan = crearPlan;
// Actualizar plan por id
const actualizarPlan = async (req, res) => {
    try {
        const { id } = req.params;
        //Opcion: aceptar solo campos permitidos para evitar update inesperado
        const allowed = ["type", "name", "benefits", "price", "img"];
        const updates = {};
        for (const key of Object.keys(req.body)) {
            if (allowed.includes(key))
                updates[key] = req.body[key];
        }
        const planActualizado = await Plan_1.default.findByIdAndUpdate(id, updates, {
            new: true, //devuelve el documento actualizado
            runValidators: true, // fuerza validaciones del schema (ej enum en type)
        });
        if (!planActualizado) {
            return res.status(404).json({ error: "Plan no encontrado" });
        }
        return res.json(planActualizado);
    }
    catch (error) {
        if (error.name === "ValidationError") {
            const mensajes = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                error: "Validacion fallida",
                mensajes,
            });
        }
        console.error("Error al actualizar plan:", error);
        res.status(500).json({ error: "Error al actualizar el plan" });
    }
};
exports.actualizarPlan = actualizarPlan;
//Eliminar plan por ID
const eliminarPlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan_1.default.findByIdAndDelete(id);
        if (!plan)
            return res.status(400).json({ error: "Plan no encontrado" });
        res.status(200).json({
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
