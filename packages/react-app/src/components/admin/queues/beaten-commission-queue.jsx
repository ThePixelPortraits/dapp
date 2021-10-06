import { useQuery } from '@apollo/react-hooks'

import { getBeatenCommissions } from 'api/queries/commissions'
import Loader from 'components/ui/widgets/loader'
import Table from 'components/ui/widgets/table'

const BeatenCommissionQueue = () => {
  const { loading, error, data } = useQuery(getBeatenCommissions, {
    pollInterval: 30000,
  })

  if (loading || error) return <Loader />

  return <Table data={data.commissionsBeaten} loading={loading} type="beaten" />
}

export default BeatenCommissionQueue
