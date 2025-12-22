// /src/graphql/types/VacancyInputType.js
import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export const VacancyCreateInputType = new GraphQLInputObjectType({
  name: "VacancyCreateInput",
  description: "Input fields required to create a new vacancy.",
  fields: {
    position: { type: GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLNonNull(GraphQLString) },
    //Time of application é definido automaticamente no backend
    timeOfApplication: { type: GraphQLString },
    timeOfResponse: { type: GraphQLNonNull(GraphQLString) },
    typeOfEmployment: { type: GraphQLNonNull(GraphQLString) },
    link: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLString },
    businessId: { type: GraphQLNonNull(GraphQLString) }
        
  },
});

export const VacancyUpdateInputType = new GraphQLInputObjectType({
  name: "VacancyUpdateInput",
  description: "Input fields required to update an existing vacancy.",
  fields: {
    position: { type: GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLString },
    timeOfApplication: { type: GraphQLString },
    timeOfResponse: { type: GraphQLString },
    typeOfEmployment: { type: GraphQLString },
    link: { type: GraphQLString },
    status: { type: GraphQLString },
    businessId: { type: GraphQLString }
        
  },
});

export const VacancyWhereInput = new GraphQLInputObjectType({
  name: "VacancyWhereInput",
  description: "Filters to search vacancies",
  fields: {
    position: { type: GraphQLString },
    location: { type: GraphQLString },
    typeOfEmployment: { type: GraphQLString },
    status: { type: GraphQLString },
    businessId: { type: GraphQLString },
  }
});