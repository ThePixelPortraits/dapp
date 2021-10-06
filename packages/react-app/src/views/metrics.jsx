import { useQuery } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'

import { getMetrics } from 'api/queries/metrics'
import Loader from 'components/ui/widgets/loader'
import useCheckAdmin from 'hooks/ui/useCheckAdmin'
import { Metric, MetricText, MetricValue } from 'views/styled/metrics'

import { PageTitle } from 'components/styled/App.styled'
import { Flex } from 'components/styled/flex.styled'
import { theme } from 'themes/default.styled'

const Metrics = () => {
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)
  const { data, loading, error } = useQuery(getMetrics)

  if (!account || loading || error) {
    return <Loader />
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <PageTitle>metrics</PageTitle>
      <Flex style={{ gap: '16px' }}>
        <Metric
          style={{ background: theme.colors.aqua, color: '#fff', width: '60%' }}
        >
          <MetricValue style={{ height: '100%', fontSize: '8rem' }}>
            {parseInt(data.metrics.totalPrice).toFixed(0)}
          </MetricValue>
          <MetricText> {data.metrics.totalPrice} ETH in queue</MetricText>
        </Metric>
        <Flex style={{ flexWrap: 'wrap', gap: '16px' }}>
          <Metric>
            <MetricValue>{data.metrics.completedCount}</MetricValue>
            <MetricText>completed commissions</MetricText>
          </Metric>
          <Metric>
            <MetricValue>{data.metrics.acceptedCount}</MetricValue>
            <MetricText>accepted commissions</MetricText>
          </Metric>
          <Metric>
            <MetricValue>{data.metrics.count}</MetricValue>
            <MetricText>queued commissions</MetricText>
          </Metric>
          <Metric style={{ background: theme.colors.green }}>
            <MetricValue>{data.metrics.zombieCount}</MetricValue>
            <MetricText>zombies</MetricText>
          </Metric>
          <Metric style={{ background: theme.colors.green }}>
            <MetricValue>{data.metrics.zombieCompleteCount}</MetricValue>
            <MetricText>completed zombies</MetricText>
          </Metric>
        </Flex>
      </Flex>
    </>
  )
}

export default Metrics
