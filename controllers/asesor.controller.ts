import { Request, Response } from "express";
import { Asesor } from "../models/Contacto";
import * as nodemailer from "nodemailer";
/* Metodo para los mail */
const trasnporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.PASS_USER,
  },
});

export const crearAsesor = async (req: Request, res: Response) => {
  try {
    const as = new Asesor(req.body);
    await as.save();
    // Correo al asesor
    await trasnporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_ASESOR,
      subject: "Nuevo cliente interesado en VetPlus",
      html: `<p>El cliente <b>${req.body.nombres} ${req.body.apellidos}</b> quiere ser contactado.</p>
         <p>Celular: ${req.body.celular}</p>
         <p>Email: ${req.body.email}</p>`,
    });

    // Correo de confirmación al cliente
    await trasnporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: "Recibimos tu solicitud - VetPlus",
      html: `<p>Hola <b>${req.body.nombres}</b>, recibimos tu solicitud.</p>
         <p>Un asesor se comunicará contigo pronto.</p>`,
    });
    res.status(201).json({ ok: true, as });
  } catch (error) {
    res.status(500).json({ error: "Error al crear al asesor" });
  }
};

export const obtenerAsesor = async (req: Request, res: Response) => {
  try {
    const as = await Asesor.find();
    res.json(as);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener al asesor" });
  }
};
