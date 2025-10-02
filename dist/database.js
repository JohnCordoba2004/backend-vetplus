"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDB() {
    try {
        const uri = process.env.MONGO_URI || "";
        await mongoose_1.default.connect(uri);
        console.log("✅ MongoDB conectado");
    }
    catch (err) {
        console.error("❌ Error al conectar a MongoDB:", err);
        process.exit(1);
    }
}
