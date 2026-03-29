import { Request, Response } from "express";
import { Asesor } from "../models/Asesor";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const crearAsesor = async (req: Request, res: Response) => {
  try {
    const as = new Asesor(req.body);
    await as.save();

    // Correo al asesor
    await resend.emails.send({
      from: "onboarding@resend.dev", //Domminio gratuito de resend
      to: process.env.EMAIL_ASESOR!,
      subject: "Nuevo cliente interesado en VetPlus",
      html: `
        <h2>Nuevo cliente interesado</h2>
        <p><b>Nombre:</b> ${req.body.nombres} ${req.body.apellidos}</p>
        <p><b>Celular:</b> ${req.body.celular}</p>
        <p><b>Email:</b> ${req.body.email}</p>
        <p><b>Mascota:</b> ${req.body.nombreMascota} (${req.body.especie})</p>
        <p><b>Plan:</b> ${req.body.planSeleccionado}</p>
        <p><b>Cobertura:</b>${req.body.cobertura}</p>
      `,
    });

    // Correo de confirmación al cliente
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: req.body.email,
      subject: "Recibimos tu solicitud - VetPlus",
      html: `
        <h2>¡Hola ${req.body.nombres}!</h2>
        <p>Recibimos tu solicitud correctamente.</p>
        <p>Un asesor de VetPlus se comunicará contigo pronto al celular <b>${req.body.celular}</b>.</p>
        <p>Gracias por confiar en nosotros.</p>
      `,
    });

    res.status(201).json({ ok: true, as });
  } catch (error) {
    console.error("Error en crearAsesor:", error);
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
