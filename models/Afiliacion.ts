import { Schema, model } from "mongoose";

const AfiliacionSchema = new Schema(
  {
    // Datos del dueño
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    documento: { type: String, required: true },
    ciudad: { type: String, required: true },
    telefono: { type: String },
    celular: { type: String, required: true },
    direccion: { type: String, required: true },
    barrio: { type: String, required: true },
    email: { type: String, required: true },

    // Datos de la mascota (vienen del store de Pinia)
    especie: { type: String },
    nombreMascota: { type: String },
    raza: { type: String },
    edad: { type: String },
    fechaNacimiento: { type: String },
    colorMascota: { type: String },
    microchip: { type: String },
    esDeRaza: { type: String },

    // Datos del plan
    planSeleccionado: { type: String },
    tipoPreventivo: { type: String },
    cobertura: { type: String },
    valorMensual: { type: Number },

    // estado: { type: String, default: "pendiente" },
  },
  // { timestamps: true },
);

export const Afiliacion = model("Afiliacion", AfiliacionSchema);
