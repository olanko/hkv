/*jshint esversion: 6 */
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'Product in Storage',
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLInt },
    unitqty: { type: GraphQLString },
    qtys: { type: GraphQLString },
  }),
});
