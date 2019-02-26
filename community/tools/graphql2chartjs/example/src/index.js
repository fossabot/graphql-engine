import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { HGE_URL } from './constants';

const GRAPHQL_ENDPOINT = `${HGE_URL.split('//')[1]}/v1alpha1/graphql`;

const httpLink = new HttpLink({
  uri: `http://${GRAPHQL_ENDPOINT}`,
});
const wsLink = new WebSocketLink({
  uri: `ws://${GRAPHQL_ENDPOINT}`,
  options: {
    reconnect: true,
  }
});
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache
});
ReactDOM.render(
  (
    <div
      style={{display: 'flex', 'alignItems': 'center', 'justifyContent': 'center', padding: '10px'}}
    >
      <ApolloProvider client={client}>
        <App client={client}/>
      </ApolloProvider>
    </div>
  ),
  document.getElementById('root')
);