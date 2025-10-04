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
    res.json(plan); //✅DEvulve el plan
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el plan por ID" });
  }
};

// 🔍 obtener por tipo (dog o cat)
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
export const crearPlan = async (req: Request, res: Response) => {
  try {
    const { type, name, desc, benefits, price, img } = req.body;

    const nuevoPlan = new Plan({ type, name, desc, benefits, price, img });
    await nuevoPlan.save();

    res.status(201).json(nuevoPlan);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(
        (err: any) => err.message
      );

      return res.status(400).json({
        error: "Validacion fallida",
        mensajes,
      });
    }

    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar plan por id
export const actualizarPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //Opcion: aceptar solo campos permitidos para evitar update inesperado
    const allowed = ["type", "name", "desc", "benefits", "price", "img"];
    const updates: any = {};

    for (const key of Object.keys(req.body)) {
      if (allowed.includes(key)) updates[key] = req.body[key];
    }

    const planActualizado = await Plan.findByIdAndUpdate(id, updates, {
      new: true, //devuelve el documento actualizado
      runValidators: true, // fuerza validaciones del schema (ej enum en type)
    });

    if (!planActualizado) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }

    return res.json(planActualizado);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(
        (err: any) => err.message
      );

      return res.status(400).json({
        error: "Validacion fallida",
        mensajes,
      });
    }

    console.error("Error al actualizar plan:", error);
    res.status(500).json({ error: "Error al actualizar el plan" });
  }
};

//Eliminar plan por ID
export const eliminarPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) return res.status(400).json({ error: "Plan no encontrado" });

    res.status(200).json({
      mensaje: "Plan eliminado correctamente",
      plan: plan,
    });
  } catch (error) {
    console.error("Error eliminar plan:", error);
    res.status(500).json({ error: "Error al eliminar el plan" });
  }
};
