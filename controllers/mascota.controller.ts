import { Request, Response } from "express";
import mascota from "../models/Mascota";

// Obtener
export const obtenerMascotas = async (req: Request, res: Response) => {
  try {
    const otros = await mascota.find();
    res.json(otros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los planes" });
  }
};

// Por id
export const obtenerMascotasPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mascotas = await mascota.findById(id);
    if (!mascotas) return res.status(404).json({ error: "Plan no encontrado" });
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el plan por ID" });
  }
};

// Crear Mascota
export const crearMascota = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const nuevaMascota = await mascota.insertMany(data);
      return res.status(201).json(nuevaMascota);
    }

    const nuevaMascota = new mascota(data);
    const resultado = await nuevaMascota.save();
    res.status(201).json(resultado);
  } catch (error: any) {
    if (error.name === "ValidationError" || error.name === "BulkWriteError") {
      return res.status(400).json({
        error: "Validación fallida",
        detalles: error.message,
      });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// ActualizarMascota
export const actualizarMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Quitamos el filtro "allowed" para que puedas editar cualquier campo del modelo
    const mascotaActualizado = await mascota.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve el documento ya editado
      runValidators: true, // Asegura que los cambios cumplan con el Schema
    });

    if (!mascotaActualizado) {
      return res
        .status(404)
        .json({ error: "Plan no encontrado para actualizar" });
    }

    return res.json(mascotaActualizado);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(
        (err: any) => err.message,
      );
      return res.status(400).json({ error: "Validación fallida", mensajes });
    }
    console.error("Error al actualizar plan:", error);
    res.status(500).json({ error: "Error al actualizar el plan" });
  }
};

// Eliminar plan por ID
export const eliminarMascota = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mascotas = await mascota.findByIdAndDelete(id);

    if (!mascotas)
      return res.status(404).json({ error: "mascotas no encontrado" });

    res.status(200).json({
      ok: true,
      mensaje: "mascotas eliminado correctamente",
      mascotas: mascotas,
    });
  } catch (error) {
    console.error("Error eliminar mascotas:", error);
    res.status(500).json({ error: "Error al eliminar las mascotas" });
  }
};
