import gql from 'graphql-tag'

export const registerZombiesMutation = gql`
  mutation registerZombies($address: String!, $ids: [String!]!) {
    registerZombies(address: $address, ids: $ids) {
      desired
    }
  }
`

export const completeZombiesMutation = gql`
  mutation completeZombies($ids: [String!]!) {
    completeZombies(ids: $ids) {
      zombieStatus
      desired
    }
  }
`
