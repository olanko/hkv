/*jshint esversion: 6 */
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

export const StorageType = new GraphQLObjectType({
  name: 'Storage',
  description: 'Storage',
  fields: () => ({
    name: { type: GraphQLString },
    id: { type: GraphQLInt },
    type: { type: GraphQLInt },
    def: { type: GraphQLBoolean }
  }),
});
