import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export const validarJWT = (req: any, res: any, next: NextFunction) => {
  //Buscamos el token en los headers(Authorization: Bearrer <token>)
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({ error: "No hay token en la peticion" })
  }

  try {
    // Verificamos si el token es real usando nuestro token
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.usuario = payload;//Guardamos la info del usuario en la peticion
    next(); // ¡Todo bien! Pasa al siguiente paso 
  } catch (error) {
    return res.status(401).json({ error: "Token no valido" })
  }
} 