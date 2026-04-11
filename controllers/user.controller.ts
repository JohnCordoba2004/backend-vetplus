import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Verificar si ya existe
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // 2. Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // 4. Responder sin password
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creando usuario" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error actualizando usuario" });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error eliminando usuario" });
  }
};