import bcrypt from "bcryptjs";
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

UsuarioSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, refreshToken, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("Usuario", UsuarioSchema);
