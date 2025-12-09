// /src/graphql/RootMutationType.js
import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { BusinessType } from './types/businessType.js';
import { BusinessInputType } from './types/businessInputType.js';

export const RootMutationType = new GraphQLObjectType({
    name: 'RootMutationType',
    description: 'The root mutation type.',
    fields: () => ({
        createBusiness: {
            type: BusinessType, // O tipo de retorno é a Empresa criada
            args: {
                // Recebe um objeto 'input' com todos os dados
                input: { type: GraphQLNonNull(BusinessInputType) }
            },
            // A lógica de resolução
            resolve: (root, args) => {
                // O 'root' vem do rootValue do express-graphql (contém o BusinessService)
                return root.businessService.create(args.input);
            }
        }
    })
});