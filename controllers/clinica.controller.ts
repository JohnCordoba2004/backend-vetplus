import { Request, Response } from "express";
import Clinica from "../models/Clinica";

// Obtener todas las clinicas
export const obtenerClinica = async (req: Request, res: Response) => {
  try {
    const clinicas = await Clinica.find();
    res.json(clinicas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las clinicas" });
  }
};

// Obtener las clinicas por id
export const obtenerClinicasPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clinica = await Clinica.findById(id);
    if (!clinica) return res.status(404).json({ error: "Plan no encontrado" });
    res.json(clinica); //✅Devulve el plan
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la clinica por ID" });
  }
};

// crear nueva clinica
export const crearClinica = async (req: Request, res: Response) => {
  try {
    // 1. Verificamos si lo que llega es un Arreglo (Carga masiva)
    if (Array.isArray(req.body)) {
      const nuevasClinicas = await Clinica.insertMany(req.body, { ordered: true });
      return res.status(201).json(nuevasClinicas);
    }

    // 2. Si no es un arreglo, es un objeto único (Lógica original)
    const nuevaClinica = new Clinica(req.body);
    await nuevaClinica.save();
    res.status(201).json(nuevaClinica);

  } catch (error: any) {
    if (error.name === "ValidationError" || error.name === "MongooseBulkWriteError") {
      // Extraemos los mensajes de error ya sea de uno o de muchos
      const mensajes = error.errors
        ? Object.values(error.errors).map((err: any) => err.message)
        : [error.message];

      return res.status(400).json({
        error: "Validacion fallida",
        mensajes,
      });
    }

    res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
};

// Actualizar plan por id
export const actualizarClinica = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //Opcion: aceptar solo campos permitidos para evitar update inesperado
    const allowed = [
      "name",
      "direction",
      "phone",
      "celular",
      "webs",
      "city"
    ];
    const updates: any = {};

    for (const key of Object.keys(req.body)) {
      if (allowed.includes(key)) updates[key] = req.body[key];
    }

    const clinicaActualizada = await Clinica.findByIdAndUpdate(id, updates, {
      new: true, //devuelve el documento actualizado
      runValidators: true, // fuerza validaciones del schema (ej enum en type)
    });

    if (!clinicaActualizada) {
      return res.status(404).json({ error: "Clinica no encontrado" });
    }

    return res.json(clinicaActualizada);
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

    console.error("Error al actualizar la clinica:", error);
    res.status(500).json({ error: "Error al actualizar la clinica" });
  }
};

//Eliminar plan por ID
export const eliminarClinica = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const clinica = await Clinica.findByIdAndDelete(id);

    if (!clinica) return res.status(400).json({ error: "Clinica no encontrada" });

    res.status(200).json({
      mensaje: "Clinica eliminada correctamente",
      clinica: clinica,
    });
  } catch (error) {
    console.error("Error eliminar clinica:", error);
    res.status(500).json({ error: "Error al eliminar la clinica" });
  }
};
