import gql from 'graphql-tag'

export const createCommissionMutation = gql`
  mutation createCommission(
    $address: String!
    $price: String!
    $desired: String!
    $twitter: String!
    $email: String
    $notes: String
    $image: UploadS3
  ) {
    createCommission(
      address: $address
      price: $price
      desired: $desired
      twitter: $twitter
      email: $email
      notes: $notes
      image: $image
    ) {
      id
    }
  }
`

export const removeCommissionMutation = gql`
  mutation removeCommission($id: String!) {
    removeCommission(id: $id)
  }
`

export const updateCompletedCommissionsMutation = gql`
  mutation updateCompletedCommissions($ids: [String!]!) {
    updateCompletedCommissions(ids: $ids) {
      price
      desired
    }
  }
`

export const flagCommissionsMutation = gql`
  mutation flagCommissions($ids: [String!]!, $flagged: Boolean) {
    flagCommissions(ids: $ids, flagged: $flagged) {
      price
      desired
    }
  }
`

export const updateInactiveCommissionsMutation = gql`
  mutation updateInactiveCommissions($ids: [String!]!) {
    updateInactiveCommissions(ids: $ids) {
      price
      desired
    }
  }
`

export const updateCommissionBid = gql`
  mutation updateCommissionBid($commission: JSONObject!) {
    updateCommissionBid(commission: $commission) {
      price
    }
  }
`
