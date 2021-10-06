import { useQuery, useMutation } from '@apollo/react-hooks'

import {
  updateInactiveCommissionsMutation,
  removeCommissionMutation,
} from 'api/mutations/commissions'
import { getPendingCommissions } from 'api/queries/commissions'
import Loader from 'components/ui/widgets/loader'
import Table from 'components/ui/widgets/table'

const CommissionQueue = () => {
  const { loading, error, data } = useQuery(getPendingCommissions, {
    pollInterval: 30000,
  })
  const [markAsInactive] = useMutation(updateInactiveCommissionsMutation, {
    refetchQueries: [{ query: getPendingCommissions }],
  })
  const [removeCommission] = useMutation(removeCommissionMutation, {
    refetchQueries: [{ query: getPendingCommissions }],
  })

  if (loading || error) return <Loader />

  const handleInactiveClick = async id => {
    await markAsInactive({
      variables: { ids: [id] },
    })
  }

  const handleDeleteClick = async id => {
    await removeCommission({
      variables: { id },
    })
  }

  return (
    <Table
      data={data?.commissionsPending}
      loading={loading}
      type="pending"
      extraColumns={['delete', 'transaction', 'inactive']}
      options={{ handleDeleteClick, handleInactiveClick }}
    />
  )
}

export default CommissionQueue
