// /src/graphql/RootMutationType.js
import { GraphQLObjectType, GraphQLNonNull,GraphQLID,GraphQLString} from 'graphql';
import { BusinessType } from './types/businessType.js';
import { BusinessInputType } from './types/businessInputType.js';
import { VacancyType } from './types/vacancyType.js';
import { VacancyInputType } from './types/vacancyInputType.js';

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
        },
        updateBusiness:{
            type: BusinessType, // O tipo de retorno é a Empresa atualizada
            args:{
                id: { type: GraphQLNonNull(GraphQLID) },
                input: { type: GraphQLNonNull(BusinessInputType) }
            },
            resolve: (root, args) => {
                return root.businessService.update(args.id, args.input);
            }
        },
        deleteBusiness:{
            type: GraphQLNonNull(GraphQLString), // O tipo de retorno é a Empresa deletada
            args:{
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (root, args) => {
                return root.businessService.delete(args.id);
            }
        },

        createVacancy: {
            type: VacancyType, // O tipo de retorno é a Vaga criada
            args: {
                input: { type: GraphQLNonNull(VacancyInputType) }
            },
            resolve: (root, args) => {
                return root.vacancyService.create(args.input);
            }
        }
    })
});