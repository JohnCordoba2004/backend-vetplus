import { Request, Response } from "express";
import { Asesor } from "../models/Asesor";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const crearAsesor = async (req: Request, res: Response) => {
  try {
    const valorInscripcion = 70000;
    const valorMensual = Number(req.body.valorMensual) || 0;
    const inscripcionMasCobertura = valorInscripcion + valorMensual;

    const as = new Asesor(req.body);
    await as.save();

    const esDeRaza = !!req.body.raza;

    // Correo al asesor
    await resend.emails.send({
      from: "onboarding@resend.dev", //Domminio gratuito de resend
      to: process.env.EMAIL_ASESOR!,
      subject: "Nuevo cliente interesado en VetPlus",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
      <td align="center">
      <table width="600" style="background: #ffffff; border-radius: 10px; overflow: hidden;">
      <!-- HEADER -->
      <tr>
        <td style="background: #2563eb; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">🐾 VetPlus</h2>
          <p style="margin: 5px 0 0;">Nuevo cliente interesado</p>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td style="padding: 20px;">

        <h3 style="color: #333;">👤 Datos del cliente</h3>
        <p><b>Nombre:</b> ${req.body.nombres} ${req.body.apellidos}</p>
        <p><b>Celular:</b> ${req.body.celular}</p>
        <p><b>Email:</b> ${req.body.email}</p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

        <h3 style="color: #333;">🐶 Datos de la mascota 😺</h3>
        <p><b>Nombre:</b> ${req.body.nombreMascota}</p>
        <p><b>Especie:</b> ${req.body.especie}</p>
        <p>
        <b>Es de raza?:</b> 
        ${esDeRaza ? "Si" : "No"}
        </p>
        <p><b>Raza:</b> 
        ${req.body.raza ? req.body.raza || "No especificada" : "No aplica"}
        </p>
        <p><b>Edad:</b> ${req.body.edad}</p>

        <p><b>Fecha Nacimiento:</b> ${req.body.fechaNacimiento}</p>
        <p><b>Color:</b> ${req.body.colorMascota}</p>
        <p><b>Microchip:</b> ${req.body.microchip || "No aplica"}</p>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

        <h3 style="color: #333;">💳 Plan seleccionado</h3>
        
        <p><b>Plan:</b> ${req.body.planSeleccionado}</p>
        <p><b>Cobertura:</b> ${req.body.cobertura}</p>
        <p><b>Preventivo:</b> ${req.body.tipoPreventivo}</p>

        <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <p><b>Inscripción:</b> $${valorInscripcion.toLocaleString()}</p>
          <p><b>Valor Mensual del paquete:</b> $${valorMensual.toLocaleString()}</p>
          <p style="font-size: 18px; color: #2563eb;">
            <b>Total:</b> $${inscripcionMasCobertura.toLocaleString()}
          </p>
        </div>

        </td>
        </tr>
        <!-- FOOTER -->
        <tr>
        <td style="background: #f9fafb; text-align: center; padding: 15px; font-size: 12px; color: #888;">
          Este mensaje fue generado automáticamente desde VetPlus 🐾
        </td>
        </tr>
        </table>
      </td>
    </tr>
  </table>

</div>
`,
    });

    // Correo de confirmación al cliente
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: req.body.email,
      subject: "Recibimos tu solicitud - VetPlus",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" style="background: #ffffff; border-radius: 10px; overflow: hidden;">
                <tr>
                  <td style="background: #2563eb; color: white; padding: 20px; text-align: center;">
                    <h2 style="margin: 0;">VetPlus</h2>
                    <p style="margin: 5px 0 0;">Recibimos tu solicitud</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 20px;">
                    <h3 style="color: #333;">Hola ${req.body.nombres}</h3>
                    <p>Estos son los datos que registraste en tu formulario:</p>

                    <h3 style="color: #333;">Datos del cliente</h3>
                    <p><b>Nombre:</b> ${req.body.nombres} ${req.body.apellidos}</p>
                    <p><b>Celular:</b> ${req.body.celular}</p>
                    <p><b>Email:</b> ${req.body.email}</p>

                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

                    <h3 style="color: #333;">Datos de la mascota</h3>
                    <p><b>Nombre:</b> ${req.body.nombreMascota}</p>
                    <p><b>Especie:</b> ${req.body.especie}</p>
                    <p><b>Raza:</b> ${req.body.raza || "No aplica"}</p>
                    <p><b>Edad:</b> ${req.body.edad}</p>
                    <p><b>Fecha de nacimiento:</b> ${req.body.fechaNacimiento}</p>
                    <p><b>Color:</b> ${req.body.colorMascota || "No especificado"}</p>
                    <p><b>Microchip:</b> ${req.body.microchip || "No aplica"}</p>

                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />

                    <h3 style="color: #333;">Plan seleccionado</h3>
                    <p><b>Plan:</b> ${req.body.planSeleccionado}</p>
                    <p><b>Cobertura:</b> ${req.body.cobertura}</p>
                    <p><b>Preventivo:</b> ${req.body.tipoPreventivo}</p>

                    <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 15px;">
                      <p><b>Inscripción:</b> $${valorInscripcion.toLocaleString()}</p>
                      <p><b>Valor mensual del paquete:</b> $${valorMensual.toLocaleString()}</p>
                      <p style="font-size: 18px; color: #2563eb;">
                        <b>Total:</b> $${inscripcionMasCobertura.toLocaleString()}
                      </p>
                    </div>

                    <p style="margin-top: 20px;">Un asesor de VetPlus se comunicará contigo pronto al celular <b>${req.body.celular}</b>.</p>
                  </td>
                </tr>

                <tr>
                  <td style="background: #f9fafb; text-align: center; padding: 15px; font-size: 12px; color: #888;">
                    Este mensaje fue generado automáticamente desde VetPlus
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
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
