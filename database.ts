import mongoose from "mongoose";


export async function connectDB() {
  try {
    const uri = process.env.MONGO_URI || "";
    await mongoose.connect(uri);
    console.log("✅ MongoDB conectado");
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB:", err);
    process.exit(1);
  }
}
