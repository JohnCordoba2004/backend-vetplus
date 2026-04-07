import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import Usuario from "../models/Usuario";

type AuthTokenPayload = JwtPayload & {
  uid: string;
  role: string;
  type: "access" | "refresh";
};

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || "secret";

const ACCESS_TOKEN_EXPIRES_IN =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "15m";

const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "refresh_secret";
  
const REFRESH_TOKEN_EXPIRES_IN =
  (process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) || "7d";

const createAccessToken = (uid: string, role: string) =>
  jwt.sign({ uid, role, type: "access" }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

const createRefreshToken = (uid: string, role: string) =>
  jwt.sign({ uid, role, type: "refresh" }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

const isAuthTokenPayload = (
  payload: string | JwtPayload,
): payload is AuthTokenPayload =>
  typeof payload !== "string" &&
  typeof payload.uid === "string" &&
  typeof payload.role === "string" &&
  (payload.type === "access" || payload.type === "refresh");

const saveRefreshToken = async (uid: string, refreshToken: string) => {
  const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);
  await Usuario.findByIdAndUpdate(uid, { refreshToken: hashedRefreshToken });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // 1. Verificar si el email existe
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: "Email no encontrado" });
    }

    // 2. Verificar la contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: "Contraseña incorrecta" });
    }

    // 3. Generar tokens
    const token = createAccessToken(usuarioDB.id, usuarioDB.role);
    const refreshToken = createRefreshToken(usuarioDB.id, usuarioDB.role);
    await saveRefreshToken(usuarioDB.id, refreshToken);

    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ ok: false, msg: "Error interno, hable con el admin" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ ok: false, msg: "Refresh token requerido" });
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    if (!isAuthTokenPayload(payload) || payload.type !== "refresh") {
      return res
        .status(401)
        .json({ ok: false, msg: "Refresh token no valido" });
    }

    const usuarioDB = await Usuario.findById(payload.uid).select(
      "+refreshToken",
    );

    if (!usuarioDB?.refreshToken) {
      return res
        .status(401)
        .json({ ok: false, msg: "Refresh token no valido" });
    }

    const validRefreshToken = bcrypt.compareSync(
      refreshToken,
      usuarioDB.refreshToken,
    );

    if (!validRefreshToken) {
      return res
        .status(401)
        .json({ ok: false, msg: "Refresh token no valido" });
    }

    const newAccessToken = createAccessToken(usuarioDB.id, usuarioDB.role);
    const newRefreshToken = createRefreshToken(usuarioDB.id, usuarioDB.role);

    await saveRefreshToken(usuarioDB.id, newRefreshToken);

    return res.json({
      ok: true,
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    const isExpired =
      error instanceof Error && error.name === "TokenExpiredError";

    return res.status(401).json({
      ok: false,
      msg: isExpired
        ? "Refresh token expirado"
        : "Refresh token no valido",
      code: isExpired ? "REFRESH_TOKEN_EXPIRED" : "REFRESH_TOKEN_INVALID",
    });
  }
};
