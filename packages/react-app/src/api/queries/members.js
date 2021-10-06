import gql from 'graphql-tag'

export const getMemberCommissions = gql`
  query membersCommissions($address: String!) {
    membersCommissions(address: $address)
  }
`

export const getZombies = gql`
  query zombies {
    zombies {
      id
      address
      twitter
      desired
      createdAt
      presale
    }
  }
`
