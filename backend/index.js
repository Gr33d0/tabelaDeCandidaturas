
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { BusinessService } from './modules/business/business.service.js';
import { RootQueryType } from './graphql/RootQueryType.js';
import { RootMutationType } from './graphql/RootMutationType.js';
import { connectDB } from './db/database.js'; // 💡 Importar a função
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000; // Usei 4000, pois é a porta comum

// 1. Inicialize a Camada de Serviço
const businessService = new BusinessService();

// 2. Crie o Schema principal
const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

// Configuração do Middleware GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: {
        businessService: businessService,
    },
    graphiql: true,
  })
);

// 🔑 AQUI É ONDE OTIMIZAMOS A ORDEM DE INICIALIZAÇÃO:
async function startServer() {
    try {
        await connectDB(); // 🛑 ESPERA O MONGODB CONECTAR
        
        // SÓ DEPOIS DE CONECTAR, INICIA O SERVIDOR HTTP
        app.listen(port, () => {
            console.log(`🚀 GraphQL Server running at http://localhost:${port}/graphql`);
        });

    } catch (error) {
        console.error("❌ O servidor não pode ser iniciado devido a um erro no DB.");
        process.exit(1);
    }
}

startServer(); // Inicia o processo