/**
 * Created by david on 7/4/17.
 */
import React, { Component } from 'react';
// allows us to use graphql query syntax in our js code
import gql from 'graphql-tag';
// allow us to take a query and put it into a component
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = { content: '' }
  }

  onSubmitHandler(event) {
    event.preventDefault();

    this.props.mutate({
      variables: {
        content: this.state.content,
        // react router only pass down params to the first component it renders
        // the :id is in the songDetails component so it's been passed down from there
        songId: this.props.songId
      }
    })
        // a little trick below here
    // clearing the content after the .then instead of inside the .then as '() => this.setState...'
        // this way the 'add a lyric' input immediately clears itself instead of waiting for the request to be sent
      .then();

      this.setState({ content: '' })

  }

  render() {
    return (
      <form onSubmit={this.onSubmitHandler.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content: event.target.value })}
        />
      </form>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID){
    addLyricToSong(content: $content, songId: $songId){
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
