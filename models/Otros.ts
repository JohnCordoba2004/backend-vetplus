import { Schema, model, Document } from "mongoose";

export interface IPlan extends Document {
  name: string;
  specialty: string[];
  direction: string[];
  webs: string[];
  phone: string[];
  city: string[];
}

const OtrosSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: [true, "El nombre debe ser obligatorio"],
    minlength: [3, "Debe tener minimo 3 caracteres"],
    trim: true,
  },
  specialty: {
    type: [String],
    default: [],
    validate: {
      validator: (arr: string[]) =>
        !arr || arr.length === 0 || arr.every((s) => s.trim().length > 0),
      message: "Si incluyes especialidades, no pueden ser texto vacio",
    },
  },
  direction: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr: string[]): boolean {
        if (!arr || arr.length === 0) return true;
        const cleanArr = arr
          .map((dir) => dir.trim())
          .filter((dir) => dir !== "");
        if (cleanArr.length === 0) return true;
        return cleanArr.every((dir) => dir.length > 0);
      },
      message: "La dirección no puede estar compuesta solo por espacios.",
    },
  },
  phone: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr: string[]): boolean {
        if (!arr || arr.length === 0) return true;
        const cleanArr = arr.map((p) => p.trim()).filter((p) => p !== "");
        if (cleanArr.length === 0) return true;
        return cleanArr.every((p) => p.length > 0);
      },
      message: "El telefono no puede estar compuesta solo por espacios.",
    },
  },
  webs: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr: string[]) {
        // 1.
        if (!arr || arr.length === 0) return true;
        // 2.
        const cleanArr = arr.map((wb) => wb.trim()).filter((wb) => wb !== "");
        // 3.
        if (cleanArr.length === 0) return true;
        // 4.
        return cleanArr.every(
          (url) =>
            /^(http|https):\/\/[^ "]+$/.test(url) || url.includes("www."),
        );
      },
      message: "Debe ser una URL válida",
    },
  },
  city: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr: string[]): boolean {
        if (!arr || arr.length === 0) return true;
        const clearArr = arr
          .map((city) => city.trim())
          .filter((city) => city !== "");
        if (clearArr.length === 0) return true;
        return clearArr.every((city) => city.length > 0);
      },
    },
  },
});
export default model<IPlan>("Otro", OtrosSchema);
