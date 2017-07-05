import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
// hashHistory, NOT browserHistory is much more straight forward with graphQL
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongCreate from './components/songCreate';
import SongDetails from './components/songDetails';
import SongList from './components/songList';

// ApolloClient assumes the graphql server is available on the /graphql route
const client = new ApolloClient({
  // gets the id field of every piece of data so that apollo knows all ids
  // we are telling it to use the 'id' field!
  // all ids must be unique
  // every query must now ask for an id
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}/>
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetails} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
