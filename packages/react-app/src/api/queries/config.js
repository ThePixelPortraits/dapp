import gql from 'graphql-tag'

export const getConfigMinBid = gql`
  query configs {
    configs {
      minBid
    }
  }
`

export const getAdmin = gql`
  query admin($address: String!) {
    admin(address: $address)
  }
`
