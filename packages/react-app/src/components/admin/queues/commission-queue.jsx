import { useQuery, useMutation } from '@apollo/react-hooks'

import { flagCommissionsMutation } from 'api/mutations/commissions'
import { getUnacceptedCommissions } from 'api/queries/commissions'
import Loader from 'components/ui/widgets/loader'
import Table from 'components/ui/widgets/table'

const CommissionQueue = ({ handleTickCount }) => {
  const { loading, error, data } = useQuery(getUnacceptedCommissions, {
    pollInterval: 30000,
  })
  const [flagCommissions] = useMutation(flagCommissionsMutation, {
    refetchQueries: [{ query: getUnacceptedCommissions }],
  })

  if (loading || error) return <Loader />

  const handleFlagClick = async (id, flagged) => {
    await flagCommissions({
      variables: { flagged, ids: [id] },
    })
  }

  return (
    <Table
      data={data.commissionsUnaccepted}
      loading={loading}
      type="commission"
      withSelection
      handleTickCount={handleTickCount}
      options={{ handleFlagClick }}
    />
  )
}

export default CommissionQueue
