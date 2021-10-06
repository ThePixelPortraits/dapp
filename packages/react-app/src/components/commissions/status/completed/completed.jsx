import { useQuery } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'

import { getUserCompletedCommissions } from 'api/queries/commissions'
import Loader from 'components/ui/widgets/loader'

import {
  CommissionItem,
  CommissionProperty,
  CommissionsContainer,
} from '../../styled/completed.styled'

const Completed = () => {
  const { account } = useWeb3React()
  const { loading, error, data } = useQuery(getUserCompletedCommissions, {
    variables: { address: account },
    skip: !account,
  })

  if (loading || error) return <Loader />

  return data?.commissionsByUserCompleted.assets.length > 0 ? (
    <CommissionsContainer>
      {data?.commissionsByUserCompleted.assets.map(commission => {
        const { id, image_preview_url, name, permalink } = commission
        return (
          <CommissionItem key={id}>
            <a href={permalink} target="_blank" rel="noopener noreferrer">
              <img src={image_preview_url} width="100%" alt={name} />
              <CommissionProperty bold>{name}</CommissionProperty>
              <CommissionProperty />
            </a>
          </CommissionItem>
        )
      })}
    </CommissionsContainer>
  ) : (
    <>you don't have any completed commissions!</>
  )
}

export default Completed
