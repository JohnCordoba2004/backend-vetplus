import { Schema, model } from "mongoose";

const asesorSchema = new Schema({
  //Datos del asesor
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  celular: { type: String, required: true },

  // Datos de la mascota (vienen del store de Pinia)
  especie: { type: String },
  nombreMascota: { type: String },
  raza: { type: String },
  edad: { type: String },
  fechaNacimiento: { type: String },
  colorMascota: { type: String },
  microchip: { type: String },

  // Datos del plan
  planSeleccionado: { type: String },
  tipoPreventivo: { type: String },
  cobertura: { type: String },
  valorMensual: { type: Number },
});

export const Asesor = model("Asesor", asesorSchema);
