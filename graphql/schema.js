import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from 'graphql';

import { ProductType } from './producttype';
import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://localhost:5000/api';

function fetchResponseByURL(relativeURL) {
  console.log(`fetchResponseByURL: ${BASE_URL}${relativeURL}`);
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchProducts() {
  console.log('fetchProducts');
  return fetchResponseByURL('/products/').then(json => json);
}

function fetchProductByURL(relativeURL) {
  return fetchResponseByURL(relativeURL).then(json => json);
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root query',
  fields: () => ({
    test: {
      type: GraphQLInt,
      resolve: () => 1
    },
    allProducts: {
      type: new GraphQLList(ProductType),
      resolve: fetchProducts
    },
    product: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchResponseByURL(`/product/${args.id}/`),
    },
  })
});

export default new GraphQLSchema({
  query: QueryType,
});
