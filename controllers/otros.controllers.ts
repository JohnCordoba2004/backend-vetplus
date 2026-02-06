import { Request, Response } from 'express';
import Otros from "../models/Otros";

//Obtener 
export const obtenerOtros = async (req: Request, res: Response) => {
  try {
    const otros = await Otros.find()
    res.json(otros)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" })
  }
}

export const obtenerOtrosPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const otros = await Otros.findById(id);
    if (!otros) return res.status(400).json({ error: "Datos no encontrados" })
    res.json(otros)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" })
  }
}

export const crearOtros = async (req: Request, res: Response) => {
  try {
    // 1.
    if (Array.isArray(req.body)) {
      const nuevosOtros = await Otros.insertMany(req.body, { ordered: true })
      return res.status(201).json(nuevosOtros)
    }
    // 2. 
    const nuevosOtros = new Otros(req.body);
    await nuevosOtros.save();
    res.status(201).json(nuevosOtros)
  } catch (error: any) {
    if (error.name === "ValidationError" || error.name === "MongooseBulkWithError") {
      const mensajes = error.errors
        ? Object.values(error.errors).map((err: any) => err.message)
        : [error.mesagge]
      return res.status(404).json({
        error: "Validacion fallida",
        mensajes
      })
    }
    res.status(505).json({ error: "Error interno del servidor", detalle: error.message })
  }
}


export const actualizarOtros = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const allowed = ["name", "specialty", "direction", "phone", "webs"];
    const updates: any = {};
    for (const keys of Object.keys(req.body)) {
      if (allowed.includes(keys)) updates[keys] = req.body[keys]
    }

    const actualizarOtros = await Otros.findByIdAndUpdate(id, updates, {
      new: true, //Devuelve el documento actualizado
      runValidators: true, //Fuerza validaciones del schema(ej enym en type)
    })

    if (!actualizarOtros) {
      res.status(400).json({ error: "Otros no encontrados" })
    }

    return res.json(actualizarOtros)
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map(
        (err: any) => err.message
      );

      return res.status(404).json({
        error: "Validacio fallida",
        mensajes,
      })
    }
    console.error("Error al actualizar:", error);
    res.status(404).json({ error: "Error al actualizar" })
  }
}

export const eliminarOtros = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const otros = await Otros.findByIdAndDelete(id)
    if (!otros) return res.status(400).json({ error: "Otro no encontrado" })

    res.status(200).json({
      mensaje: "Otro no encontrado",
      otros: otros
    })
  } catch (error: any) {
    console.error("Error al eliminar:", error),
      res.status(500).json({ error: "Error al eliminar" })
  }
}