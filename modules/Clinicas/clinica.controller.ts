import { Request, Response } from "express";
import * as service from "./clinica.service";

// Obtener
export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: "Error al obtener las clinicas" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await service.getById(id);
    if (!data) return res.status(404).json({ error: "Clinica no encontrada" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la clinica" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (Array.isArray(data)) {
      const result = await service.createMany(data);
      return res.status(201).json(result);
    }
    const result = await service.createOne(data);
    res.status(201).json(result);
  } catch (error: any) {
    if (error.name === "ValidationError" || error.name === "BulkWriteError") {
      return res.status(400).json({
        error: "Validacion fallida",
        detalles: error.message,
      });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const update = await service.update(id, req.body);

    if (!update) {
      return res
        .status(404)
        .json({ error: "Clinica no encontrada para actualizar" });
    }

    res.json(update);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(
        (err: any) => err.message,
      );
      return res.status(400).json({
        error: "Validacion fallida",
        mensajes,
      });
    }

    res.status(500).json({ error: "Error al actualizar la clinica" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await service.remove(id);

    if (!deleted) {
      return res.status(404).json({ error: "Clinica no encontrada" });
    }

    res.json({
      ok: true,
      mensaje: "Clnica eliminada correctamente",
      beneficio: deleted,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la clinica"});
  }
};
