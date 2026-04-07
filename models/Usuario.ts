import { Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String, default: null, select: false },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// Quitamos la contraseña cuando devolvamos el JSON por seguridad
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, refreshToken, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("Usuario", UsuarioSchema);
