import { Document, Schema, model } from "mongoose";

import {
  isValidOptionalStringArray,
  optionalArrayOf,
  isURL,
  hasAtLeastOneNonEmpty,
} from "../../utils";

export interface IPlan extends Document {
  name: String;
  specialty: String[];
  direction: String[];
  web: String[];
  desc: String;
}

const ProfesionalSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: [true, "EL nombre debe ser obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    trim: true,
  },
  specialty: {
    type: [String],
    default: [],
    validate: {
      validator: hasAtLeastOneNonEmpty,
      message: "Debe haber al menos una especialidad valida",
    },
  },
  direction: {
    type: [String],
    default: [],
    validate: {
      validator: isValidOptionalStringArray,
      message: "La dirección no puede estar compuesto solo por espacios",
    },
  },
  web: {
    type: [String],
    default: [],
    validate: {
      validator: optionalArrayOf(isURL),
      message: "Debe ser una URL valida.",
    },
  },
  desc: {
    type: [String],
    default: [],
    validate: {
      validator: isValidOptionalStringArray,
      message: "La descripcion no puede estar compuesto solo por espacios.",
    },
  },
});

export default model<IPlan>("Profesional", ProfesionalSchema);
