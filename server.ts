console.log("Iniciando el servidor...");

import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database";

import plansRoutes from "./routes/plans.routes";
import clinicaRoutes from "./routes/clinica.routes";
import profesionalesRoutes from "./routes/profesionales.routes";
import otrosRoutes from "./routes/otros.routes";

dotenv.config();
console.log("Variable de entoron cargadas...");

const app = express();
console.log("express cargado...");

// Middlewares
app.use(cors());
app.use(express.json()); //Para leer el json

// Conexion MongoDB
console.log("Conectando a mongoDB...");
connectDB();

//Routes
app.use("/api/planes", plansRoutes);
app.use("/api/clinicas", clinicaRoutes);
app.use("/api/profesionales", profesionalesRoutes)
app.use("/api/otros", otrosRoutes)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
