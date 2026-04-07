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
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes")); // Importa tus nuevas rutas de login
const plans_routes_1 = __importDefault(require("./routes/plans.routes"));
const clinica_routes_1 = __importDefault(require("./routes/clinica.routes"));
const profesionales_routes_1 = __importDefault(require("./routes/profesionales.routes"));
const otros_routes_1 = __importDefault(require("./routes/otros.routes"));
const mascota_routes_1 = __importDefault(require("./routes/mascota.routes"));
const afiliacion_routes_1 = __importDefault(require("./routes/afiliacion.routes"));
const asesor_routes_1 = __importDefault(require("./routes/asesor.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// 1. CONFIGURACIÓN DE CORS (Debe ir antes de las rutas)
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};
// Middleware sencillo para limpiar caracteres de inyección NoSQL ($ y .)
const simpleSanitize = (req, res, next) => {
    const sanitize = (obj) => {
        if (obj instanceof Object) {
            for (const key in obj) {
                if (key.startsWith("$") || key.includes(".")) {
                    delete obj[key];
                }
                else {
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
app.use((0, cors_1.default)(corsOptions)); // Ahora sí protege todo lo que sigue
// 2. MIDDLEWARES DE SEGURIDAD Y PARSING
app.use(express_1.default.json({ limit: "10kb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10kb" }));
app.use((0, helmet_1.default)());
// 3. CONEXIÓN A BASE DE DATOS
(0, database_1.connectDB)();
// 4. RUTAS
app.use("/api/auth", auth_routes_1.default); // La ruta para el login
app.use("/api/planes", plans_routes_1.default);
app.use("/api/clinicas", clinica_routes_1.default);
app.use("/api/profesionales", profesionales_routes_1.default);
app.use("/api/otros", otros_routes_1.default);
app.use("/api/mascotas", mascota_routes_1.default);
app.use("/api/afiliaciones", afiliacion_routes_1.default);
app.use("/api/asesor", asesor_routes_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// 5. MANEJO DE ERRORES (Siempre al final de las rutas)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res
        .status(500)
        .json({ error: "Algo salió mal en el servidor, intenta más tarde." });
});
// 6. ¡EL ARRANQUE! (Te faltaba esta parte fuera de los comentarios)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
