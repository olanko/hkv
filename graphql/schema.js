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

function fetchResponseByURL(relativeURL, accessToken) {
  var headers = new Headers();
  headers.append('access-token')
  console.log(`fetchResponseByURL: ${BASE_URL}${relativeURL}`);
  return fetch(`${BASE_URL}${relativeURL}?access_token=${accessToken}`).then(res => res.json());
}

function fetchProducts(accessToken) {
  console.log('fetchProducts');
  return fetchResponseByURL('/products/', accessToken).then(json => json);
}

function fetchProductByURL(relativeURL, accessToken) {
  return fetchResponseByURL(relativeURL, accessToken).then(json => json);
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
      args: {
        accessToken: { type: GraphQLString }
      },
      resolve: (root, args) => fetchProducts(args.accessToken)
    },
    product: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
        accessToken: { type: GraphQLString }
      },
      resolve: (root, args) => fetchResponseByURL(`/product/${args.id}/`, args.accessToken),
    },
  })
});

export default new GraphQLSchema({
  query: QueryType,
});
