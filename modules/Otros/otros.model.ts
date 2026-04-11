import { Document, Schema, model } from "mongoose";

import {
  optionalArrayOf,
  isURL,
  hasAtLeastOneNonEmpty,
  isColombianPhone,
} from "../../utils";

export interface IPlan extends Document {
  name: String;
  specialty: String[];
  direction: String[];
  web: String[];
  phone: String[];
  city: String[];
}

const OtrosSchema = new Schema<IPlan>({
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
      validator: hasAtLeastOneNonEmpty,
      message: "Debe haber al menos una direccion valida",
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
  phone: {
    type: [String],
    default: [],
    validate: {
      validator: (arr: string[]) =>
        arr.length > 0 && arr.every((t) => !t.trim() || isColombianPhone(t)),
      message: "Debe haber al menos un teléfono válido",
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

export default model<IPlan>("Otros", OtrosSchema);
