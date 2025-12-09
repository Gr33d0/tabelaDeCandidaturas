// /src/graphql/RootQueryType.js
import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } from 'graphql';
import { BusinessType } from './types/businessType.js';

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
        }
    })
});