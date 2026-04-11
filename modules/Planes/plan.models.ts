import { Document, Schema, model } from "mongoose";
import { isURL, hasAtLeastOneNonEmpty } from "../../utils";

export interface IPlan extends Document {
  type: "dog" | "cat";
  name: string;
  img: string;
  benefits: string[];
  desc: string;
  descName: string;
  price: number;
  descPrice: string;
}

const PlanSchema = new Schema<IPlan>({
  type: {
    type: String,
    enum: { values: ["dog", "cat"], message: "El tipo debe ser 'dog' o 'cat'" },
    required: [true, "El tipo es obligatorio"],
  },
  name: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    trim: true,
  },
  desc: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    trim: true,
    minlength: [20, "La descripción debe tener al menos 20 caracteres"],
  },
  descName: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    trim: true,
    minlength: [20, "La descripción debe tener al menos 20 caracteres"],
  },
  descPrice: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    trim: true,
    minlength: [20, "La descripción debe tener al menos 20 caracteres"],
  },
  benefits: {
    type: [String],
    required: [true, "Debe incluir al menos un beneficio"],
    validate: {
      validator: hasAtLeastOneNonEmpty,
      message: "Debe incluir al menos un beneficio",
    },
  },
  price: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [1000, "El precio debe ser mayor o igual a 1000"],
    validate: {
      validator: Number.isFinite,
      message: "El precio debe ser un numero valido",
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
});

export default model<IPlan>("Plan", PlanSchema);
