import { Request, Response } from "express";
import { Afiliacion } from "../models/Afiliacion";

export const crearAfiliacion = async (req: Request, res: Response) => {
  try {
    const afiliacion = new Afiliacion(req.body);
    await afiliacion.save();
    res.status(201).json({ ok: true, afiliacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Error al guardar la afiliación" });
  }
};

export const obtenerAfiliacion = async (req: Request, res: Response) => {
  try {
    const af = await Afiliacion.find();
    res.json(af);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los planes" });
  }
};
