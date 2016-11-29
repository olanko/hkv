/*jshint esversion: 6 */
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
} from 'graphql';

export const TransferType = new GraphQLObjectType({
  name: 'Transfer',
  description: 'Transfer',
  fields: () => ({
    id: { type: GraphQLInt },
    productid: { type: GraphQLInt },
    type: { type: GraphQLInt },
    fromstorageid: { type: GraphQLInt },
    tostorageid: { type: GraphQLInt },
    user: { type: GraphQLInt },
    transfertime: { type: GraphQLString },
    inserttime: { type: GraphQLString },
    absolute: { type: GraphQLFloat },
    relative: { type: GraphQLFloat },
    comment: { type: GraphQLString },
  }),
});
