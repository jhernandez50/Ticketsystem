import React from 'react';
import {onError} from 'apollo-link-error';
import {ApolloLink} from 'apollo-link';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Layout from './Layout'
const httpLink = createHttpLink({
  uri: '/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});
const link=ApolloLink.from([errorLink,authLink,httpLink])

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
          <Layout/>
    </ApolloProvider>
  );
}

export default App;
