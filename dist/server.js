"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Iniciando el servidor...");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./database");
const plans_routes_1 = __importDefault(require("./routes/plans.routes"));
dotenv_1.default.config();
console.log("Variable de entoron cargadas...");
const app = (0, express_1.default)();
console.log("express cargado...");
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json()); //Para leer el json
// Conexion MongoDB
console.log("Conectando a mongoDB...");
(0, database_1.connectDB)();
//Routes
app.use("/api/planes", plans_routes_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
