import { Request, Response } from "express";
import { Afiliacion } from "../models/Afiliacion";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const crearAfiliacion = async (req: Request, res: Response) => {
  try {
    const afiliacion = new Afiliacion(req.body);
    await afiliacion.save();

    const ValorInscripcion = 70000;
    const inscripcionMasCobertura = ValorInscripcion + req.body.valorMensual;

    //Correo al afiliarse
    await resend.emails.send({
      from: "onboarding@resend.dev", //Domminio gratuito de resend
      to: process.env.EMAIL_ASESOR!,
      subject: "Nuevo cliente interesado en VetPlus",
      html: `
        <h2>Nuevo cliente interesado</h2>
        <p><b>Nombre:</b> ${req.body.nombres} ${req.body.apellidos}</p>
        <p><b>Documento de identidad:</b>${req.body.documento}</p>
        <p><b>Ciudad:</b>${req.body.ciudad}</p>
        <p><b>Telefono:</b> ${req.body.telefono}</p>
        <p><b>Celular:</b> ${req.body.celular}</p>
        <p><b>Direccion:</b> ${req.body.direccion}</p>
        <p><b>Barrio/Localidad:</b> ${req.body.barrio}</p>
        <p><b>Email:</b> ${req.body.email}</p>    
        <p><b>Mascota:</b> ${req.body.nombreMascota} (${req.body.especie})</p>
        <p><b>Fecha Nacimiento Mascota:</b> ${req.body.fechaNacimiento}</p>
        <p><b>Color Mascota:</b> ${req.body.colorMascota}</p>
        <p><b>Microchip:</b> ${req.body.microchip}</p>
        <p><b>Valor inscripcion:</b>${ValorInscripcion}</p>
        <p><b>Valor mensual del paquete:</b> ${req.body.valorMensual}</p>
        <p><b>Valor total a pagar:</b> ${inscripcionMasCobertura}</p>
        <p><b>Plan:</b> ${req.body.planSeleccionado}</p>
        <p><b>Cobertura:</b>${req.body.cobertura}</p>
      `,
    });

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
