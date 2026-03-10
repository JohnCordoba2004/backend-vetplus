import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'ADMIN_ROLE', enum: ['ADMIN_ROLE', 'USER_ROLE'] }
});

// Quitamos la contraseña cuando devolvamos el JSON por seguridad
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model('Usuario', UsuarioSchema);