import gql from 'graphql-tag'

export const getQueue = gql`
  query queue {
    queue {
      price
      desired
      position
      flagged
      status
    }
  }
`
