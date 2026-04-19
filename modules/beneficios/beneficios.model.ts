import { Document, Schema, model } from "mongoose";

import { isValidOptionalStringArray, optionalArrayOf, isURL } from "../../utils";

export interface IPlan extends Document {
  name: String;
  direction: String[];
  telefono: String[];
  web: String[];
  desc: String[];
  contact: String[];
  img: String;
  imgFull: String;
}

const BeneficiosSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: [true, "EL nombre debe ser obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    trim: true,
  },
  direction: {
    type: [String],
    default: [],
    validate: {
      validator: isValidOptionalStringArray,
      message: "La dirección no puede estar compuesto solo por espacios",
    },
  },
  telefono: {
    type: [String],
    default: [],
    validate: {
      validator: isValidOptionalStringArray,
      message: "El telefono no puede estar compuesto solo por espacios",
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
  contact: {
    type: [String],
    default: [],
    validate: {
      validator: isValidOptionalStringArray,
      message: "El contacto no puede estar compuesto solo por espacios.",
    },
  },
  img: {
    type: String,
    required: [true, "La imagen es obligatoria"],
    validate: {
      validator: isURL,
      message: "La imagen debe ser una URL valida",
    },
  },
  imgFull: {
    type: String,
    required: [true, "La imagen es obligatoria"],
    validate: {
      validator: isURL,
      message: "La imagen debe ser una URL valida",
    },
  },
});

export default model<IPlan>("Beneficio", BeneficiosSchema);
