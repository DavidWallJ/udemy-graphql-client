/**
 * Created by david on 7/4/17.
 */
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

// we need to pass the id through the onClick for the 'dataIdFromObject' in the main index.js
// we always need to know the id
class LyricList extends Component {
  onLikeHandler (id, likes) {
    this.props.mutate({
      variables: { id },
      // the optimistic Response is essentially what we get back in the 'network' tab when the mutation is run + our hoped for response
      // you can literally copy and past and add in your vars
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id: id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics () {
    // es6 destructuring below
    // like saying (lyric) => { lyric.id }
    return this.props.lyrics.map(({id, content, likes}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onLikeHandler(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      )
    })
  }

  render () {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`

export default graphql(mutation)(LyricList)
