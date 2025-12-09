// /src/graphql/RootQueryType.js
import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import { BusinessType } from './types/businessType.js';
import { VacancyType } from './types/vacancyType.js';
export const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'The root query type.',
    fields: () => ({
        // 1. Query para buscar UMA empresa por ID
        business: {
            type: BusinessType,
            args: { 
                id: { type: GraphQLNonNull(GraphQLID) } 
            },
            // O 'root' aqui vem do rootValue do express-graphql
            resolve: (root, args) => {
                return root.businessService.findById(args.id);
            }
        },
        
        // 2. Query para buscar TODAS as empresas
        businesses: {
            type: GraphQLList(BusinessType),
            args: {},
            resolve: (root, args) => {
                return root.businessService.findAll();
            }
        },

        //3. Query para buscar uma vaga por ID
        vacancy: {
            type: VacancyType,
            args: { 
                id: { type: GraphQLNonNull(GraphQLID) } 
            },
            // O 'root' aqui vem do rootValue do express-graphql
            resolve: (root, args) => {
                return root.vacancyService.findById(args.id);
        }},
        //4. Query para buscar todas as vagas
        vacancies: {
            type: GraphQLList(VacancyType),
            args: {},
            resolve: (root, args) => {
                return root.vacancyService.findAll();
        }}
    })
});