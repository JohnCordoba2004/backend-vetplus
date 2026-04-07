import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"; //JwtPayload y SignOptions se importan para tipar mejor los datos del token y el tiempo de expiración.
import Usuario from "../models/Usuario";

//creo un tipo llamado AuthTokenPayload.
type AuthTokenPayload = JwtPayload & {
  //uid será el id del usuario dentro del token
  uid: string;
  //role será el rol del usuario, por ejemplo admin o user.
  role: string;
  //type me sirve para distinguir si el token es de acceso o de refresco.
  type: "access" | "refresh";
};
//guardo la clave secreta del token normal.
const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET || "secret";

//Líneas 19-20: defino cuánto dura el token normal. Si no hay variable en .env, dura 15m.
const ACCESS_TOKEN_EXPIRES_IN =
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "15m";

//guardo la clave secreta del refresh token. Si no existe en .env, usa un valor por defecto.
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

//defino cuánto dura el refresh token. Si no hay variable, dura 7d.
const REFRESH_TOKEN_EXPIRES_IN =
  (process.env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"]) || "7d";

//creo una función para generar el token normal.
const createAccessToken = (uid: string, role: string) =>
  //dentro del token guardo uid, role y type: "access".
  jwt.sign({ uid, role, type: "access" }, ACCESS_TOKEN_SECRET, {
    //ese token expirará con el tiempo que puse arriba.
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

//creo otra función para generar el refresh token.
const createRefreshToken = (uid: string, role: string) =>
  // Línea 29: aquí también guardo uid y role, pero el type es "refresh".
  jwt.sign({ uid, role, type: "refresh" }, REFRESH_TOKEN_SECRET, {
    // Línea 30: ese token dura más tiempo.
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

//hago una validación de seguridad para asegurarme de que lo que viene del token tiene la forma correcta.
const isAuthTokenPayload = (
  //verifico que el payload no sea un string simple.
  payload: string | JwtPayload,
): payload is AuthTokenPayload =>
  typeof payload !== "string" &&
  //verifico que uid exista y sea texto.
  typeof payload.uid === "string" &&
  //verifico que role exista y sea texto..
  typeof payload.role === "string" &&
  //verifico que type sea access o refresh.
  (payload.type === "access" || payload.type === "refresh");

// creo una función para guardar el refresh token en la base de datos.
const saveRefreshToken = async (uid: string, refreshToken: string) => {
  //antes de guardarlo lo encripto con bcrypt.
  const hashedRefreshToken = bcrypt.hashSync(refreshToken, 10);
  //actualizo el usuario y le guardo ese refresh token encriptado.
  await Usuario.findByIdAndUpdate(uid, { refreshToken: hashedRefreshToken });
};

//empieza el login.
export const login = async (req: Request, res: Response) => {
  //saco email y password del cuerpo de la petición.
  const { email, password } = req.body;
  try {
    // 1. Verificar si el email existe
    // busco el usuario por email.
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      //si no existe, respondo con error.
      return res.status(404).json({ ok: false, msg: "Email no encontrado" });
    }

    // 2. Verificar la contraseña
    //comparo la contraseña enviada con la contraseña guardada.
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      //si no coincide, respondo con error.
      return res.status(400).json({ ok: false, msg: "Contraseña incorrecta" });
    }

    // 3. Generar tokens
    //comentario para indicar que ahora genero 2 tokens.
    // creo el token normal.
    const token = createAccessToken(usuarioDB.id, usuarioDB.role);
    //creo el refresh token.
    const refreshToken = createRefreshToken(usuarioDB.id, usuarioDB.role);
    //guardo el refresh token en la base de datos.
    await saveRefreshToken(usuarioDB.id, refreshToken);

    //devuelvo al frontend el usuario, el token normal y el refresh token.
    res.json({
      ok: true,
      usuario: usuarioDB,
      token,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500) // si algo falla, mando error 500.
      .json({ ok: false, msg: "Error interno, hable con el admin" });
  }
};

//creo una función nueva llamada refreshAccessToken.
export const refreshAccessToken = async (req: Request, res: Response) => {
  // saco refreshToken del body.
  const { refreshToken } = req.body;

  // si no me mandan refresh token, respondo error.
  if (!refreshToken) {
    return res.status(400).json({ ok: false, msg: "Refresh token requerido" });
  }

  //verifico que el refresh token sea válido usando su propia clave secreta.
  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    //además verifico que realmente sea un token de tipo refresh.
    if (!isAuthTokenPayload(payload) || payload.type !== "refresh") {
      return res
        .status(401)
        .json({ ok: false, msg: "Refresh token no valido" });
    }

    //busco el usuario dueño de ese token y pido explícitamente el campo refreshToken.
    const usuarioDB = await Usuario.findById(payload.uid).select(
      "+refreshToken",
    );

    // si el usuario no tiene refresh token guardado, respondo error.
    if (!usuarioDB?.refreshToken) {
      return res
        .status(401)
        .json({ ok: false, msg: "Refresh token no valido" });
    }

    // comparo el refresh token recibido con el refresh token encriptado guardado en DB.
    const validRefreshToken = bcrypt.compareSync(
      refreshToken,
      usuarioDB.refreshToken,
    );

    // si no coinciden, respondo error.
    if (!validRefreshToken) {
      return res
        .status(401)
        .json({ ok: false, msg: "Refresh token no valido" });
    }

    //genero un token normal nuevo.
    const newAccessToken = createAccessToken(usuarioDB.id, usuarioDB.role);
    //genero un refresh token nuevo.
    const newRefreshToken = createRefreshToken(usuarioDB.id, usuarioDB.role);

    //guardo el refresh token nuevo, reemplazando el anterior.
    await saveRefreshToken(usuarioDB.id, newRefreshToken);

    // devuelvo ambos tokens nuevos al frontend.
    return res.json({
      ok: true,
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    const isExpired =
      error instanceof Error && error.name === "TokenExpiredError";

    // si el refresh token expiró o no sirve, respondo con un código claro para que el frontend sepa qué pasó.
    return res.status(401).json({
      ok: false,
      msg: isExpired ? "Refresh token expirado" : "Refresh token no valido",
      code: isExpired ? "REFRESH_TOKEN_EXPIRED" : "REFRESH_TOKEN_INVALID",
    });
  }
};
