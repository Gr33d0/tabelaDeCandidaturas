import { GraphQLID, GraphQLObjectType,GraphQLString } from "graphql";
import {EmpresaModel} from "../../model/empresa.js";
import {VagaModel} from "../../model/vaga.js";
export const VacancyType = new GraphQLObjectType({
  name: 'Vacancy',
  description: 'A job vacancy',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    position: { type: GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLNonNull(GraphQLString) },
    timeOfResponse: { type: GraphQLNonNull(GraphQLString) },
    typeOfEmployment: { type: GraphQLNonNull(GraphQLString) },
    link: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLNonNull(GraphQLString) }
  })
})

export const BusinessType = new GraphQLObjectType({
  name: 'Business',
  description: 'A business',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    city: { type: GraphQLString },
  })
})