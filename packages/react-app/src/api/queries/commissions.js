import gql from 'graphql-tag'

export const getCommissions = gql`
  query commissions {
    commissions {
      id
      price
      desired
      onChainId
      beatenBy
      beatenByPrice
      createdAt
      position
      status
    }
  }
`

export const getCommissionsCount = gql`
  query commissionsCount {
    commissionsCount
  }
`

export const getCommission = gql`
  query commission($id: String!) {
    commission(id: $id) {
      id
      price
      desired
      altNames
      onChainId
      beatenBy
      beatenByPrice
      createdAt
      position
      status
      twitter
      notes
      address
      image
    }
  }
`
export const getTopCommission = gql`
  query topCommissionPrice {
    topCommissionPrice
  }
`

export const getPositionForPrice = gql`
  query position($price: String!) {
    position(price: $price)
  }
`

export const getMinPriceForName = gql`
  query minPrice($name: String) {
    minPrice(name: $name)
  }
`

export const getNameCommissions = gql`
  query commissionsByName($name: String) {
    commissionsByName(name: $name) {
      id
      price
      notes
      desired
      onChainId
      beatenBy
      beatenByPrice
      createdAt
      position
      status
    }
  }
`

export const getAcceptedCommissions = gql`
  query commissionsAccepted {
    commissionsAccepted {
      id
      price
      desired
      onChainId
      createdAt
      twitter
      flagged
    }
  }
`

export const getBeatenCommissions = gql`
  query commissionsBeaten {
    commissionsBeaten {
      id
      price
      desired
      onChainId
      beatenBy
      beatenByPrice
      position
      createdAt
      status
    }
  }
`

export const getPendingCommissions = gql`
  query commissionsPending {
    commissionsPending {
      id
      price
      desired
      onChainId
      createdAt
      twitter
      flagged
      address
    }
  }
`

export const getUnacceptedCommissions = gql`
  query commissionsUnaccepted {
    commissionsUnaccepted {
      id
      price
      desired
      onChainId
      beatenBy
      createdAt
      position
      twitter
      flagged
    }
  }
`

export const getUserCommissions = gql`
  query commissionsByUser($address: String!) {
    commissionsByUser(address: $address) {
      id
      price
      desired
      status
      onChainId
      beatenBy
      createdAt
      beatenByPrice
      position
      flagged
    }
  }
`

export const getUserCompletedCommissions = gql`
  query commissionsByUserCompleted($address: String!) {
    commissionsByUserCompleted(address: $address)
  }
`
