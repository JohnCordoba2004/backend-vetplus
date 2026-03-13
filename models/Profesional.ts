import { Schema, model, Document } from "mongoose";

export interface IPlan extends Document {
  name: string;
  specialty: string[];
  direction: string[];
  webs: string[]; // Añadida la coma que faltaba aquí
  desc: string[];
}

const ProfesionalesSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
  },
  specialty: {
    type: [String],
    default: [], // Añadido default vacío
    validate: {
      // Ahora permite que el arreglo esté vacío
      validator: (arr: string[]) =>
        !arr || arr.length === 0 || arr.every((s) => s.trim().length > 0),
      message: "Si incluyes especialidades, no pueden ser texto vacío",
    },
  },
  direction: {
    type: [String],
    // El campo "direction" será un arreglo de cadenas de texto.

    default: [],
    // Si no se envía nada, por defecto será un arreglo vacío.

    validate: {
      validator: function (arr: string[]): boolean {
        // 1. Si el arreglo no existe (!arr) o está vacío (arr.length === 0), lo aceptamos como válido.
        if (!arr || arr.length === 0) return true;

        // 2. Creamos un nuevo arreglo "cleanArr":
        //    - Usamos map() para recorrer cada dirección y aplicar trim(), eliminando espacios en blanco al inicio y al final.
        //    - Luego usamos filter() para descartar las cadenas que quedaron vacías después del trim.
        const cleanArr = arr
          .map((dir) => dir.trim())
          .filter((dir) => dir !== "");

        // 3. Si después de limpiar todas las direcciones el arreglo quedó vacío, lo aceptamos como válido.
        //    (Esto significa que se permite guardar el campo vacío).
        if (cleanArr.length === 0) return true;

        // 4. Finalmente verificamos que cada elemento del arreglo limpio tenga al menos un carácter.
        //    Si todos cumplen, retorna true (válido); si alguno no cumple, retorna false (inválido).
        return cleanArr.every((dir) => dir.length > 0);
      },

      message: "La dirección no puede estar compuesta solo por espacios.",
      // Mensaje de error que se mostrará si la validación falla.
    },
  },

  webs: {
    type: [String],
    // El campo "webs" será un arreglo de cadenas de texto (URLs).

    default: [],
    // Si no se envía nada, por defecto será un arreglo vacío.

    validate: {
      validator: function (arr: string[]) {
        // 1. Si el arreglo no existe (!arr) o está vacío (arr.length === 0), lo aceptamos como válido.
        if (!arr || arr.length === 0) return true;

        // 2. Creamos un nuevo arreglo "cleanArr":
        //    - Usamos filter() para descartar las cadenas que están vacías o compuestas solo por espacios.
        const cleanArr = arr.filter((url) => url.trim() !== "");

        // 3. Si después de limpiar todas las URLs el arreglo quedó vacío, lo aceptamos como válido.
        //    (Esto significa que se permite guardar el campo vacío).
        if (cleanArr.length === 0) return true;

        // 4. Validamos cada URL del arreglo limpio:
        //    - Debe cumplir con un formato básico de URL que empiece por http:// o https://
        //    - O bien contener "www." como parte de la dirección.
        //    Si todas cumplen, retorna true; si alguna falla, retorna false.
        return cleanArr.every(
          (url) =>
            /^(http|https):\/\/[^ "]+$/.test(url) || url.includes("www."),
        );
      },

      message: "Debe ser una URL válida",
      // Mensaje de error que se mostrará si la validación falla.
    },
  },

  desc: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr: string[]): boolean {
        // Si no hay nada, es valido
        if (!arr || arr.length === 0) return true;

        const cleanArr = arr
          .map((desc) => desc.trim())
          .filter((desc) => desc !== "");

        if (cleanArr.length === 0) return true;

        return arr.every((desc) => desc.trim().length >= 20);
      },
      message:
        "La descripción debe tener al menos 20 caracteres si decides poner una.",
    },
  },
});

export default model<IPlan>("Profesional", ProfesionalesSchema);
