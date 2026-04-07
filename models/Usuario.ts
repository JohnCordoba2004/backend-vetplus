import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // agregué el campo refreshToken al usuario.
  //default: null significa que puede empezar vacío.
  //select: false significa que Mongoose no lo devolverá por defecto en consultas normales.
  refreshToken: { type: String, default: null, select: false },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Quitamos la contraseña cuando devolvamos el JSON por seguridad
// en el toJSON, además de ocultar password, también oculto refreshToken. 
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, refreshToken, _id, ...usuario } = this.toObject();
  // sigo transformando _id a uid como ya hacías antes.
  usuario.uid = _id;
  return usuario;
};

export default model("Usuario", UsuarioSchema);
