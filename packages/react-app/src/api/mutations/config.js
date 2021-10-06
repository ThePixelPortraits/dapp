import gql from 'graphql-tag'

export const updateMinBidMutation = gql`
  mutation updateMinBid($minBid: Float!) {
    updateMinBid(minBid: $minBid) {
      minBid
    }
  }
`
