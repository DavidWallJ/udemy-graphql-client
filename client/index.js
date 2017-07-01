import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// ApolloClient assumes the graphql server is available on the /graphql route
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  )

};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
