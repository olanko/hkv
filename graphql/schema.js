/*jshint esversion: 6 */
import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

import { ProductType } from './producttype';
import { StorageType } from './storagetype';
import { TransferType } from './transfertype';

import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://localhost:5000/api';

function fetchResponseByURL(relativeURL, accessToken) {
  console.log(`fetchResponseByURL: ${BASE_URL}${relativeURL}`);

  var headers = new Headers();
  headers.append('access-token');

  return fetch(`${BASE_URL}${relativeURL}?access_token=${accessToken}`).then(res => res.json());
}
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root query',
  fields: () => ({
    allProducts: {
      type: new GraphQLList(ProductType),
      args: {
        accessToken: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, args) => fetchResponseByURL('/products', args.accessToken)
    },
    product: {
      type: ProductType,
      args: {
        id: { type: GraphQLInt },
        accessToken: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, args) => fetchResponseByURL(`/products/${args.id}`, args.accessToken),
    },
    allStorages: {
      type: new GraphQLList(StorageType),
      args: {
        accessToken: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, args) => fetchResponseByURL('/storages', args.accessToken)
    },
    storage: {
      type: StorageType,
      args: {
        id: { type: GraphQLInt },
        accessToken: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, args) => fetchResponseByURL(`/storages/${args.id}`, args.accessToken),
    },
    allTransfers: {
      type: new GraphQLList(TransferType),
      args: {
        accessToken: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, args) => fetchResponseByURL(`/transfers`, args.accessToken)
    },
    transfer: {
      type: TransferType,
      args: {
        id: { type: GraphQLInt },
        accessToken: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (root, args) => fetchResponseByURL(`/transfers/${args.id}`, args.accessToken),
    },
  })
});

export default new GraphQLSchema({
  query: QueryType,
});
