// /src/graphql/types/VacancyType.js
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLInt,
} from "graphql";
import { BusinessType } from './businessType.js';

export const VacancyType = new GraphQLObjectType({
  name: "Vacancy",
  description: "A Vacancy",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      // Resolve o _id do MongoDB para o campo id do GraphQL
      resolve: (vacancy) => vacancy._id.toString(),
    },
    position: { type: GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLString },
    timeOfApplication: { type: GraphQLString },
    timeOfResponse: { type: GraphQLInt },
    typeOfEmployment: { type: GraphQLString },
    link: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    businessId: { type: GraphQLID },
    business: {
      type: BusinessType,
      resolve: (parent, args, { businessService }) => {
        if (!parent.businessId) return null;
        return businessService.findById(parent.businessId);
      },
    },
  }),
});
