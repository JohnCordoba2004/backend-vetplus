import { Schema, model, Document } from "mongoose";

export interface IPlan extends Document {
  name: string;
  direction: string[];
  phone: string[];
  celular: string[];
  webs: string[];
  city: string;
}

const ClinicaSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    minlength: [3, "El nombre debe tener al menos 3 caracteres"], // Corregido: minlength
  },
  direction: {
    type: [String],
    required: [true, "Debe incluir al menos una direccion"],
    validate: {
      validator: (arr: string[]) => arr && arr.length > 0,
      message: "Debe incluir al menos una direccion", // Corregido el mensaje
    },
  },
  phone: {
    type: [String],
    required: [true, "El teléfono es obligatorio"], // Mensaje corregido
    validate: {
      validator: (arr: string[]) => arr && arr.length > 0,
      message: "Debe incluir al menos un teléfono",
    },
  },
  celular: {
    type: [String],
    required: [true, 'Debe incluir al menos un numero celular'],
    validate: {
      validator: (arr: string[]) => arr && arr.length > 0,
      message: "Debe incluir al menos un numero celular"
    }
  },
  webs: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr: string[]) {
        // Si no hay nada, es válido (hace que sea opcional)
        if (!arr || arr.length === 0) return true;

        // 2. Filtramos posibles strings vacíos que vengan del formulario
        const cleanArr = arr.filter(url => url.trim() !== "");
        if (cleanArr.length === 0) return true;

        // 3. Validamos solo los links que tengan contenido
        return cleanArr.every(url => /^(http|https):\/\/[^ "]+$/.test(url));
      },
      message: "Cada sitio web debe ser una URL válida (ej: https://...)"
    },
  },
  city: {
    type: String,
    required: [true, "La ciudad es obligatoria"],
    trim: true,
    minlength: [3, "El nombre de la ciudad debe tener al menos 3 caracteres"], // Corregido: minlength
  }
});

export default model<IPlan>("Clinica", ClinicaSchema);