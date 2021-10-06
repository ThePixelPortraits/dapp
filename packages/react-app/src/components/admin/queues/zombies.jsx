import { useQuery } from '@apollo/react-hooks'

import { getZombies } from 'api/queries/members'
import Loader from 'components/ui/widgets/loader'
import Table from 'components/ui/widgets/table'

const QueueZombies = ({ handleTickCount }) => {
  const { loading, error, data } = useQuery(getZombies, {
    pollInterval: 30000,
  })

  if (loading || error) return <Loader />

  return (
    <Table
      data={data.zombies}
      loading={loading}
      type="commission"
      withSelection
      handleTickCount={handleTickCount}
    />
  )
}

export default QueueZombies
