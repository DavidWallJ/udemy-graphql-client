/**
 * Created by david on 7/3/17.
 */
// graphql-tab allows us to use graphql syntax in our js project
import gql from 'graphql-tag';

export default gql`
  {
    songs {
      id
      title
    }
  }
`;
