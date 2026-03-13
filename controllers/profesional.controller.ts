import { Request, Response } from "express";
import Profesional from "../models/Profesional";

// Obtener a todos los veterinarios profesionales

export const obtenerProfesionales = async (req: Request, res: Response) => {
  try {
    const profesional = await Profesional.find();
    res.json(profesional);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener a los profesionales" });
  }
};

// Obtener todos los profesionales por ID
export const obtenerProfesionalesPorId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const profesional = await Profesional.findById(id);
    if (!profesional)
      return res.status(404).json({ error: "Plan no encontrado" });
    res.json(profesional); //✅Devuelve los profesionales
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los profesionales por Id" });
  }
};

//Crear nuevos roles
export const crearProfesionales = async (req: Request, res: Response) => {
  try {
    // 1. Verificamos si lo que llega es un arreglo
    if (Array.isArray(req.body)) {
      const nuevaProfesion = await Profesional.insertMany(req.body, {
        ordered: true,
      });
      return res.status(201).json(nuevaProfesion);
    }

    //2. Si no es un arreglo, es un objeto unico (Logica Original)
    const nuevaProfesion = new Profesional(req.body);
    await nuevaProfesion.save();
    res.status(201).json(nuevaProfesion);
  } catch (error: any) {
    if (
      error.name === "validationError" ||
      error.name === "MongooseBulkWriteError"
    ) {
      //Extraemos los mensajes de error ya sea uno o de muchos
      const mensajes = error.errors
        ? Object.values(error.errors).map((err: any) => err.message)
        : [error.message];

      return res.status(400).json({
        error: "Validacion fallida",
        mensajes,
      });
    }
    res
      .status(500)
      .json({ error: "Error interno del servidor", detalle: error.message });
  }
};

// Actualizar por Id
export const actualizarProfesionales = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const actualizarProfesion = await Profesional.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true, //Devuelve el documento actualizado
        runValidators: true, //Fuerza validaciones del schema(ej enym en type)
      },
    );

    if (!actualizarProfesion) {
      res.status(400).json({ error: "Profesion no encontrada" });
    }

    return res.json(actualizarProfesion);
  } catch (error: any) {
    if (error.name === "validationError") {
      const mensajes = Object.values(error.errors).map(
        (err: any) => err.message,
      );

      return res.status(400).json({
        error: "Validacion fallida",
        mensajes,
      });
    }

    console.error("Error al actualizar los profesionales:", error);
    res.status(400).json({ error: "Error al actualizar a los profesionales" });
  }
};

// Eliminar por Id
export const eliminarProfesionales = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profesional = await Profesional.findByIdAndDelete(id);

    if (!profesional)
      return res.status(400).json({ error: "Profesional no encontrado" });

    res.status(200).json({
      ok: true,
      mensaje: "Profesional eliminado correctamente",
      profesional: profesional,
    });
  } catch (error: any) {
    console.error("Error al eliminar profesional:", error);
    res.status(500).json({ error: "Error al eliminar profesional" });
  }
};
