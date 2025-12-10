import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDB } from './db/database.js';

dotenv.config();
const port = process.env.PORT || 4000;

async function startServer() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`🚀 GraphQL Server running at http://localhost:${port}/graphql`);
    });

  } catch (error) {
    console.error("❌ Erro ao iniciar servidor", error);
    process.exit(1);
  }
}

startServer();
