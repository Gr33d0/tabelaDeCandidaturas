// /src/graphql/types/BusinessType.js
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,GraphQLList
} from "graphql";

import { VacancyType } from './vacancyType.js';

export const BusinessType = new GraphQLObjectType({
  name: "Business",
  description: "A business entity",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLID),
      // Resolve o _id do MongoDB para o campo id do GraphQL
      resolve: (business) => business._id.toString(),
    },
    name: { type: GraphQLNonNull(GraphQLString) },

    city: { type: GraphQLString },

    vacancies: {
      type: GraphQLList(VacancyType),
      resolve: (parent, args, { vacancyService }) => {
        return vacancyService.findByBusinessId(parent._id);
      },
    },
  }),
});
