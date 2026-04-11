import { model, Document, Schema } from "mongoose";
import {
  hasAtLeastOneNonEmpty,
  isColombianPhone,
  isURL,
  optionalArrayOf,
} from "../../utils";

export interface IPlan extends Document {
  name: string;
  direction: string[];
  phone: string[];
  celular: string[];
  webs: string[];
  city: string[];
}

const ClinicaSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    minlength: [3, "El nombre debe teneral menos 3 caracteres"],
  },
  direction: {
    type: [String],
    default: [],
    required: [true, "Debe incluir al menos una direccion"],
    validate: {
      validator: hasAtLeastOneNonEmpty,
      message: "Debe haber al menos una direccion válida",
    },
  },
  phone: {
    type: [String],
    default: [],
    validate: {
      validator: hasAtLeastOneNonEmpty,
      message: "Debe haber al menos un telefono válido",
    },
  },
  celular: {
    type: [String],
    default: [],
    validate: {
      validator: optionalArrayOf(isColombianPhone),
      message: "Teléfono inválido",
    },
  },
  webs: {
    type: [String],
    default: [],
    validate: {
      validator: optionalArrayOf(isURL),
      message: "Debe ser una URL valida.",
    },
  },
  city: {
    type: [String],
    default: [],
    validate: {
      validator: hasAtLeastOneNonEmpty,
      message: "Debe haber al menos una ciudad válida",
    },
  },
});

export default model<IPlan>("Clinica", ClinicaSchema);
