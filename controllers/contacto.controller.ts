import { Request, Response } from "express";
import { Asesor } from "../models/Contacto";

export const crearAsesor = async (req: Request, res: Response) => {
  try {
    const as = new Asesor(req.body);
    await as.save();
    res.status(201).json({ ok: true, as });
  } catch (error) {
    res.status(500).json({ error: "Error al crear al asesor" });
  }
};

export const obtenerAsesor = async (req: Request, res: Response) => {
  try {
    const as = Asesor.find();
    res.json(as);
  } catch (error) {
    res.json(500).json({ error: "Error al obtener al asesor" });
  }
};
