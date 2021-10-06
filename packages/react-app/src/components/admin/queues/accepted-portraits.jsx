import { useMutation, useQuery } from '@apollo/react-hooks'

import { flagCommissionsMutation } from 'api/mutations/commissions'
import { getAcceptedCommissions } from 'api/queries/commissions'
import Loader from 'components/ui/widgets/loader'
import Table from 'components/ui/widgets/table'

const AcceptedPortraits = ({ handleTickCount }) => {
  const { loading, error, data } = useQuery(getAcceptedCommissions, {
    pollInterval: 30000,
  })
  const [flagCommissions] = useMutation(flagCommissionsMutation, {
    refetchQueries: [{ query: getAcceptedCommissions }],
  })

  if (loading || error) return <Loader />

  const handleFlagClick = async (id, flagged) => {
    await flagCommissions({
      variables: { flagged, ids: [id] },
    })
  }

  return (
    <Table
      data={data.commissionsAccepted}
      loading={loading}
      type="accepted"
      withSelection
      handleTickCount={handleTickCount}
      options={{ handleFlagClick }}
    />
  )
}

export default AcceptedPortraits
