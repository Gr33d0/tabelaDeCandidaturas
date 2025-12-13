import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import { BusinessService } from './modules/business/business.service.js';
import { VacancyService } from './modules/vacancy/vacancy.service.js';
import { RootQueryType } from './graphql/RootQueryType.js';
import { RootMutationType } from './graphql/RootMutationType.js';

const app = express();

// Services
const businessService = new BusinessService();
const vacancyService = new VacancyService();

// Schema
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

// Middleware GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: {
      businessService,
      vacancyService,
    },
    context: {
      businessService,
      vacancyService,
    },
    graphiql: true,
  })
);

export { app };
