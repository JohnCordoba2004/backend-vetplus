import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
// import Usuario from "../models/Usuario";
import User from "../models/User";

type AuthTokenPayload = JwtPayload & {
  uid: string;
  role: string;
  type: "access" | "refresh";
};

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || "secret";
const ACCESS_TOKEN_EXPIRES_IN =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "15m";

const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";
const REFRESH_TOKEN_EXPIRES_IN =
  (process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) || "7d";
const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;

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
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  await User.findByIdAndUpdate(uid, { refreshToken: hashedRefreshToken });
};

const validatePassword = async (
  plainPassword: string,
  storedPassword: string,
) => {
  if (!storedPassword) {
    return false;
  }

  if (BCRYPT_HASH_PATTERN.test(storedPassword)) {
    return bcrypt.compare(plainPassword, storedPassword);
  }

  return plainPassword === storedPassword;
};

export const login = async (req: Request, res: Response) => {
  const email = String(req.body.email ?? "")
    .trim()
    .toLowerCase();
  const password = String(req.body.password ?? "");

  try {
    console.log("[login] inicio", { email });

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, msg: "Email y contraseña son obligatorios" });
    }

    const usuarioDB = await User.findOne({ email });
    console.log("[login] usuario encontrado", { email, found: !!usuarioDB });

    if (!usuarioDB) {
      return res.status(404).json({ ok: false, msg: "Email no encontrado" });
    }

    const storedPassword = String(usuarioDB.password ?? "");
    const isHash = BCRYPT_HASH_PATTERN.test(storedPassword);
    console.log("[login] tipo password almacenada", {
      email,
      isHash,
      length: storedPassword.length,
    });

    const validPassword = await validatePassword(password, storedPassword);
    console.log("[login] password valida", { email, validPassword });

    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: "Contraseña incorrecta" });
    }

    if (!isHash) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(usuarioDB.id, {
        password: hashedPassword,
      });
      console.log("[login] password migrada a hash", { email });
    }

    const token = createAccessToken(usuarioDB.id, usuarioDB.role);
    const refreshToken = createRefreshToken(usuarioDB.id, usuarioDB.role);

    await saveRefreshToken(usuarioDB.id, refreshToken);
    console.log("[login] refresh token guardado", {
      email,
      role: usuarioDB.role,
    });
    console.log("[login] respondiendo ok", { email, role: usuarioDB.role });

    return res.json({
      ok: true,
      usuario: usuarioDB,
      token,
      refreshToken,
    });
  } catch (error) {
    console.error("[login] error", error);
    return res
      .status(500)
      .json({ ok: false, msg: "Error interno, hable con el admin" });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ ok: false, msg: "Refresh token requerido" });
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    if (!isAuthTokenPayload(payload) || payload.type !== "refresh") {
      return res
        .status(401)
        .json({ ok: false, msg: "Refresh token no valido" });
    }

    const usuarioDB = await User.findById(payload.uid).select(
      "+refreshToken",
    );

    if (!usuarioDB?.refreshToken) {
      return res
        .status(401)
        .json({ ok: false, msg: "Refresh token no valido" });
    }

    const validRefreshToken = await bcrypt.compare(
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
      msg: isExpired ? "Refresh token expirado" : "Refresh token no valido",
      code: isExpired ? "REFRESH_TOKEN_EXPIRED" : "REFRESH_TOKEN_INVALID",
    });
  }
};
