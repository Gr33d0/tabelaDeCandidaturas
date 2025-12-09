// /src/graphql/types/VacancyInputType.js
import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { BusinessType } from './businessType.js';

export const VacancyInputType = new GraphQLInputObjectType({
  name: "VacancyInput",
  description: "Input fields required to create a new vacancy.",
  fields: {
    position: { type: GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLString },
    //Time of application é definido automaticamente no backend
    timeOfResponse: { type: GraphQLString },
    typeOfEmployment: { type: GraphQLString },
    link: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    businessId: { type: GraphQLNonNull(GraphQLString) }
        
  },
});
