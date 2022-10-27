import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { worker } from './msw';
import App from './App';
import './index.css';

worker.start();

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://mydomain.com/graphql',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
