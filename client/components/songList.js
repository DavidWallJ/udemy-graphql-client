/**
 * Created by david on 7/1/17.
 */
// you are here 4:36 into 'invoking delete mutation'

import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import query from '../queries/fetchSongs'

class SongList extends Component {
  onSongDelete (id) {
    this.props.mutate({variables: {id}})
    // this is another way of refreshing a component
    // different than the 'createSong.js' refresh
    // this is more straight forward because 'deleteMutation' is already associated with this component
      .then(() => this.props.data.refetch())
  }

  // { id, title } gives us .map's resulting song.id and song.title
  // es6 destructuring
  renderSongs () {
    return this.props.data.songs.map(({id, title}) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      )
    })
  }

  render () {
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link
          to="/songs/new"
          className="btn-floating btn-large red right"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    )
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID ) {
    deleteSong(id: $id) {
      id
      title
    }
  }
`

// the query was imported at the top of the file
// the query results will be put in the this.props object in the component
// graphql is not setup to take multiple arguments
// so we use multiple instances of the graphql helper

export default graphql(mutation)(
  graphql(query)(SongList)
)

