// /src/graphql/types/BusinessInputType.js
import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export const BusinessInputType = new GraphQLInputObjectType({
    name: 'BusinessInput',
    description: 'Input fields required to create a new business.',
    fields: {
        name: { type: GraphQLNonNull(GraphQLString) },
        city: { type: GraphQLString },
    }
});