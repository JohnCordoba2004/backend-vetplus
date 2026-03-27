import { Schema, model, Document } from "mongoose";

export interface IPlan extends Document {
  nombreMascota: string;
  especie: string;
  esDeRaza: boolean;
  raza: string;
  edad: string;
  peso: string;
  comSupo: string;
  detalleComoSupo: string;
  planSeleccionado: string;
  tipoPreventivo: string;
  cobertura: string;
  valorMensual: number;
  fechaNacimiento: Date;
  colorMascota: string;
  microchip: number;
}

export const mascotaSchema = new Schema<IPlan>({
  nombreMascota: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
    minLength: [3, "Debe tener minimo 3 caracteres"],
    trim: true,
  },
  especie: {
    type: String,
    required: [true, "La especie es obligatoria"],
    enum: ["Perros", "Gatos"],
    trim: true,
  },
  esDeRaza: {
    type: Boolean,
    required: [true, "Debes indicar si es de raza o no"],
    default: false,
    validate: {
      validator: function (valor) {
        return valor === true || valor === false;
      },
      message: "El valor debe ser verdadero o falso",
    },
  },
  raza: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
    trim: true,
  },
  edad: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
    trim: true,
  },
  peso: {
    type: String,
    required: [true, "El peso debe ser obligatorio"],
    trim: true,
  },
  comSupo: {
    type: String,
    required: [true, "Como supo debe ser obligatorio"],
    trim: true,
  },
  detalleComoSupo: {
    type: String,
    required: [true, "El detalle debe ser obligatorio"],
    trim: true,
  },
  planSeleccionado: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
    enum: ["Diamante", "Esmeralda", "Silver", "Senior"],
    trim: true,
  },
  tipoPreventivo: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
    enum: ["Premium", "Basico"],
    trim: true,
  },
  cobertura: {
    type: String,
    required: [true, "Debes seleccionar cobertura"],
    enum: ["70%", "80%", "90%"], // restringe valores
    trim: true,
  },
  valorMensual: {
    type: Number, // mejor como número
    min: [0, "El valor mensual no puede ser negativo"],
    required: [true, "El valor mensual es obligatorio"],
  },
  fechaNacimiento: {
    type: Date, // mejor como fecha
    required: [true, "La fecha de nacimiento es obligatoria"],
  },
  colorMascota: {
    type: String,
    minlength: [3, "El color debe tener mínimo 3 caracteres"],
    required: [true, "El color debe ser obligatorio"],
    trim: true,
  },
  microchip: {
    type: Number,
    min: [0, "El número de microchip no puede ser negativo"],
  },
});

export default model<IPlan>("Mascota", mascotaSchema);
