/**
 * Created by david on 7/4/17.
 */
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './lyricCreate';
import LyricList from './lyricList';

class SongDetails extends Component {
  render() {
    const { song, loading } = this.props.data;

    if (loading === true) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id}/>
      </div>
    );
  }
}

// Integrating React Router with GraphQL / 11:30
// fetchSong requires an 'id' off of the URL
// the props are going through graphql here so we have the chance to pull them off using the 'options' parameter thanks to react-apollo
export default graphql(fetchSong, {
  options: (props) => { return { variables: {id: props.params.id} } }
})(SongDetails);
