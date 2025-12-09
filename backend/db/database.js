import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Conexão com MongoDB estabelecida com sucesso.");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
        process.exit(1); // Sair do processo se a conexão falhar
    }
}

