import { Schema, model, Document } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  specialty: string[];
  direction: string[];
  webs: string[]; // Añadida la coma que faltaba aquí
}

const ProfesionalesSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    minlength: [3, "El nombre debe tener al menos 3 caracteres"]
  },
  specialty: {
    type: [String],
    default: [], // Añadido default vacío
    validate: {
      // Ahora permite que el arreglo esté vacío
      validator: (arr: string[]) => !arr || arr.length === 0 || arr.every(s => s.trim().length > 0),
      message: "Si incluyes especialidades, no pueden ser texto vacío"
    }
  },
  direction: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr: string[]): boolean {
        if (!arr || arr.length === 0) return true;
        const cleanArr = arr.map(dir => dir.trim()).filter(dir => dir !== "");
        if (cleanArr.length === 0) return true;
        return cleanArr.every(dir => dir.length > 0);
      },
      message: "La dirección no puede estar compuesta solo por espacios."
    }
  },
  webs: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr: string[]) {
        if (!arr || arr.length === 0) return true;
        const cleanArr = arr.filter(url => url.trim() !== "");
        if (cleanArr.length === 0) return true;
        // Agregué validación de formato básico para URLs que no traen http
        return cleanArr.every(url => /^(http|https):\/\/[^ "]+$/.test(url) || url.includes('www.'));
      },
      message: "Debe ser una URL válida"
    },
  },
});

export default model<IPlan>("Profesional", ProfesionalesSchema);