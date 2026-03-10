import { Request, Response } from 'express';
import Otros from "../models/Otros";

// Obtener todos los registros
export const obtenerOtros = async (req: Request, res: Response) => {
  try {
    const otros = await Otros.find();
    res.json(otros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

// Obtener por ID
export const obtenerOtrosPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const otros = await Otros.findById(id);
    if (!otros) return res.status(404).json({ error: "Datos no encontrados" });
    res.json(otros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

// Crear registros (Soporta uno solo o varios en un Array)
export const crearOtros = async (req: Request, res: Response) => {
  try {
    if (Array.isArray(req.body)) {
      const nuevosOtros = await Otros.insertMany(req.body, { ordered: true });
      return res.status(201).json(nuevosOtros);
    }
    const nuevosOtros = new Otros(req.body);
    await nuevosOtros.save();
    res.status(201).json(nuevosOtros);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ error: "Validación fallida", mensajes });
    }
    res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
  }
};

// ACTUALIZAR (Corregido: Sin filtros restrictivos innecesarios)
export const actualizarOtros = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Usamos req.body directamente para que tome cualquier campo que envíes desde Apidog
    const registroActualizado = await Otros.findByIdAndUpdate(id, req.body, {
      new: true, // Para que devuelva el objeto ya cambiado
      runValidators: true, // Para que valide que el precio sea número, etc.
    });

    if (!registroActualizado) {
      return res.status(404).json({ error: "No se encontró el registro para actualizar" });
    }

    return res.json(registroActualizado);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ error: "Validación fallida", mensajes });
    }
    console.error("Error al actualizar:", error);
    res.status(500).json({ error: "Error interno al actualizar" });
  }
};

// ELIMINAR (Corregido: Mensaje de éxito coherente)
export const eliminarOtros = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const otros = await Otros.findByIdAndDelete(id);

    if (!otros) {
      return res.status(404).json({ error: "No se encontró el registro para eliminar" });
    }

    res.status(200).json({
      ok: true,
      mensaje: "Registro eliminado correctamente",
      eliminado: otros
    });
  } catch (error: any) {
    console.error("Error al eliminar:", error);
    res.status(500).json({ error: "Error al eliminar" });
  }
};