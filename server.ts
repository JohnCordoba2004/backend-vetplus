console.log("Iniciando el servidor...");

import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes"; // Importa tus nuevas rutas de login
// import mongoSanitize from 'express-mongo-sanitize';

import plansRoutes from "./routes/plans.routes";
import clinicaRoutes from "./routes/clinica.routes";
import profesionalesRoutes from "./routes/profesionales.routes";
import otrosRoutes from "./routes/otros.routes";

dotenv.config();
const app = express();

// 1. CONFIGURACIÓN DE CORS (Debe ir antes de las rutas)
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

// Middleware sencillo para limpiar caracteres de inyección NoSQL ($ y .)
const simpleSanitize = (req: any, res: any, next: any) => {
  const sanitize = (obj: any) => {
    if (obj instanceof Object) {
      for (const key in obj) {
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else {
          sanitize(obj[key]);
        }
      }
    }
  };
  sanitize(req.body);
  sanitize(req.params);
  sanitize(req.query);
  next();
};

// Úsalo en lugar de la librería
app.use(simpleSanitize);
app.use(cors(corsOptions)); // Ahora sí protege todo lo que sigue
// 2. MIDDLEWARES DE SEGURIDAD Y PARSING
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
/* app.use(mongoSanitize({
  replaceWith: '_',
})); */
app.use(helmet());


// 3. CONEXIÓN A BASE DE DATOS
connectDB();

// 4. RUTAS
app.use("/api/auth", authRoutes); // La ruta para el login
app.use("/api/planes", plansRoutes);
app.use("/api/clinicas", clinicaRoutes);
app.use("/api/profesionales", profesionalesRoutes);
app.use("/api/otros", otrosRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// 5. MANEJO DE ERRORES (Siempre al final de las rutas)
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor, intenta más tarde.' });
});

// 6. ¡EL ARRANQUE! (Te faltaba esta parte fuera de los comentarios)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});