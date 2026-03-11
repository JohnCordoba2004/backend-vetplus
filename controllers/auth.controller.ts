import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 1. Verificar si el email existe
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: 'Email no encontrado' });
    }

    // 2. Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: 'Contraseña incorrecta' });
    }

    // 3. Generar el TOKEN
    const token = jwt.sign(
      { uid: usuarioDB.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Error interno, hable con el admin' });
  }
};