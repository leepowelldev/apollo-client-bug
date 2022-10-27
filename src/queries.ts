import { gql } from '@apollo/client';

const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      where
      when
      description
    }
  }
`;

export { GET_EVENT };
