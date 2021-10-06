import gql from 'graphql-tag'

export const getGallery = gql`
  query gallery($limit: Int, $offset: Int) {
    gallery(limit: $limit, offset: $offset)
  }
`
