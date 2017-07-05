/**
 * Created by david on 7/3/17.
 */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
// gql so react can understand the graphql syntax
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {title: ''}
  }

  onSubmit (event) {
    event.preventDefault();

    // this is how we pass vars to a mutation
    // a mutation returns a promise
    this.props.mutate({
      // variables object is setup to handle passing though variables to the mutation below
      variables: {
        title: this.state.title
      },
      // we need to tell graphql to refetch queries because be default it won't
      // graphql will never try and run the same exact query twice
      // you could also pass in some 'variables:variables' below
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'));
  }

  render () {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({title: event.target.value})}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

// query variables inside of graphql need to be used to get data from react component into our graphql mutation
// query params, section 6, lecture 45, 6:10

const mutation = gql`
 mutation addSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
