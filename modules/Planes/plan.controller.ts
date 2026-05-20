import { Request, Response } from "express";
  import * as service from "./plan.services";

// Obtener todos
export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await service.getALL();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los planes" });
  }
};
// Obtener con id
export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await service.getById(id);
    if (!data) return res.status(404).json({ error: "Plan no encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Errro al obtener el plan con el id" });
  }
};

// Obtener por tipo
export const obtenerPlanesPorTipo = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    const planes = await service.obtenerPlanesPorTipo(tipo);
    res.json(planes);
  } catch (error) {
    return res.status(500).json({ error: "Erro al obtener el plan por tipo" });
  }
};

// Crear (uno o varios)
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
    if (error.name === "ValidationError" || error.name === "BulkwriteError") {
      return res.status(400).json({
        error: "Validación fallida",
        detalles: error.message,
      });
    }
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Actualizar
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const update = await service.update(id, req.body);

    if (!update)
      return res
        .status(404)
        .json({ error: "Beneficio no encontrado para actualizar" });

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
    res.status(500).json({ error: "Error al actualizar el plan" });
  }
};

// Eliminar
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await service.remove(id);
    if (!deleted) {
      return res.status(404).json({ error: "Plan no encontrado" });
    }
    res.json({
      ok: true,
      mensaje: "Plan eliminado correctamente",
      plan: deleted,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el plan" });
  }
};
