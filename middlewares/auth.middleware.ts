import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validarJWT = (req: any, res: Response, next: NextFunction) => {
  //Buscamos el token en los headers(Authorization: Bearrer <token>)
  const token = req
    .header("Authorization")
    ?.replace(/^Bearer\s+/i, "")
    .trim();
  if (!token) {
    return res.status(401).json({ error: "No hay token en la peticion" });
  }

  try {
    // Verificamos si el token es real usando nuestro token
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.usuario = payload; //Guardamos la info del usuario en la peticion
    next(); // ¡Todo bien! Pasa al siguiente paso
  } catch (error) {
    // creo una variable isExpired.
    //reviso si el error fue exactamente porque el token expiró.
    const isExpired =
      error instanceof Error && error.name === "TokenExpiredError";
    // ahora el backend responde distinto según el caso.
    return res.status(401).json({
      //si expiró, digo "Token expirado".
      error: isExpired ? "Token expirado" : "Token no valido",
      //también mando un código más fácil de leer desde frontend: TOKEN_EXPIRED o TOKEN_INVALID.
      code: isExpired ? "TOKEN_EXPIRED" : "TOKEN_INVALID",
    });
  }
};

export const validarAdmin = (req: any, res: Response, next: NextFunction) => {
  if (req.usuario.role !== "admin") {
    return res.status(403).json({ error: "Acceso denegado, solo admin" });
  }
  next();
};
