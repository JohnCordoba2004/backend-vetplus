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
    if (!clinica) return res.status(404).json({ error: "Clínica no encontrada" });
    res.json(clinica);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la clínica por ID" });
  }
};

// Crear nueva clinica
export const crearClinica = async (req: Request, res: Response) => {
  try {
    
    if (Array.isArray(req.body)) {
      const nuevasClinicas = await Clinica.insertMany(req.body, { ordered: true });
      return res.status(201).json(nuevasClinicas);
    }

    const nuevaClinica = new Clinica(req.body);
    await nuevaClinica.save();
    res.status(201).json(nuevaClinica);

  } catch (error: any) {
    if (error.name === "ValidationError" || error.name === "MongooseBulkWriteError") {
      const mensajes = error.errors
        ? Object.values(error.errors).map((err: any) => err.message)
        : [error.message];

      return res.status(400).json({
        error: "Validación fallida",
        mensajes,
      });
    }
    res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
};

// ACTUALIZAR (Corregido: Flexible y sin bloqueos)
export const actualizarClinica = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Usamos directamente req.body para que acepte cualquier campo que venga de Apidog
    const clinicaActualizada = await Clinica.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Fuerza validaciones del schema
    });

    if (!clinicaActualizada) {
      return res.status(404).json({ error: "Clínica no encontrada para actualizar" });
    }

    return res.json(clinicaActualizada);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(
        (err: any) => err.message
      );

      return res.status(400).json({
        error: "Validación fallida",
        mensajes,
      });
    }

    console.error("Error al actualizar la clínica:", error);
    res.status(500).json({ error: "Error al actualizar la clínica" });
  }
};

// Eliminar clínica por ID
export const eliminarClinica = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clinica = await Clinica.findByIdAndDelete(id);

    if (!clinica) return res.status(404).json({ error: "Clínica no encontrada" });

    res.status(200).json({
      ok: true,
      mensaje: "Clínica eliminada correctamente",
      clinica: clinica,
    });
  } catch (error) {
    console.error("Error eliminar clínica:", error);
    res.status(500).json({ error: "Error al eliminar la clínica" });
  }
};