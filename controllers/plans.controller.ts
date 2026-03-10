import { Request, Response } from "express";
import Plan from "../models/Plan";

// Obtener todos los planes
export const obtenerPlanes = async (req: Request, res: Response) => {
  try {
    const planes = await Plan.find();
    res.json(planes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los planes" });
  }
};

// Obtener los planes por id
export const obtenerPlanesPorID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findById(id);
    if (!plan) return res.status(404).json({ error: "Plan no encontrado" });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el plan por ID" });
  }
};

// obtener por tipo (dog o cat)
export const obtenerPlanesPorTipo = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    const planes = await Plan.find({ type: tipo });
    res.json(planes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el plan por tipo" });
  }
};

// crear un nuevo plan
// crear uno o varios planes
export const crearPlan = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // Si mandas un array [], usamos insertMany. Si es uno solo {}, usamos save().
    if (Array.isArray(data)) {
      const nuevosPlanes = await Plan.insertMany(data);
      return res.status(201).json(nuevosPlanes);
    }

    const nuevoPlan = new Plan(data);
    await nuevoPlan.save();
    res.status(201).json(nuevoPlan);

  } catch (error: any) {
    if (error.name === "ValidationError" || error.name === "BulkWriteError") {
      return res.status(400).json({
        error: "Validación fallida",
        detalles: error.message
      });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ACTUALIZAR (Corregido y optimizado)
export const actualizarPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Quitamos el filtro "allowed" para que puedas editar cualquier campo del modelo
    const planActualizado = await Plan.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve el documento ya editado
      runValidators: true, // Asegura que los cambios cumplan con el Schema
    });

    if (!planActualizado) {
      return res.status(404).json({ error: "Plan no encontrado para actualizar" });
    }

    return res.json(planActualizado);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ error: "Validación fallida", mensajes });
    }
    console.error("Error al actualizar plan:", error);
    res.status(500).json({ error: "Error al actualizar el plan" });
  }
};

// Eliminar plan por ID
export const eliminarPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) return res.status(404).json({ error: "Plan no encontrado" });

    res.status(200).json({
      ok: true,
      mensaje: "Plan eliminado correctamente",
      plan: plan,
    });
  } catch (error) {
    console.error("Error eliminar plan:", error);
    res.status(500).json({ error: "Error al eliminar el plan" });
  }
};