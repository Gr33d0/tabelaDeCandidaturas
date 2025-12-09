// /src/graphql/types/BusinessType.js
import { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLNonNull
} from 'graphql';

// ⚠️ IMPORTAÇÃO FUTURA: O tipo Vaga será necessário para a relação
// import { VacancyType } from './VacancyType'; 

export const BusinessType = new GraphQLObjectType({
    name: 'Business',
    description: 'A business entity',
    fields: () => ({
        id: { 
            type: GraphQLNonNull(GraphQLID),
            // Resolve o _id do MongoDB para o campo id do GraphQL
            resolve: (business) => business._id.toString() 
        },
        name: { type: GraphQLNonNull(GraphQLString) },
  
        city: { type: GraphQLString },

        // RELAÇÃO FUTURA: A ser implementada quando você criar o VacancyType
        // vacancies: {
        //     type: GraphQLList(VacancyType),
        //     resolve: (parent, args, { vacancyService }) => {
        //         return vacancyService.findByBusinessId(parent._id);
        //     }
        // }
    })
});