import Flagged from 'components/ui/widgets/flagged'

import { Spot, SpotProperty, QueueTitle } from 'components/queue/queue.styled'
import { Flex } from 'components/styled/flex.styled'

const QueueType = ({
  queue,
  type,
  queueTitle,
  noPrice = false,
  full,
  limit = 10,
}) => {
  const restrict = full ? 100000 : limit
  const sortedArray = [...queue]
    .filter(item => item.status === type)
    .sort((a, b) => parseInt(a.position) - parseInt(b.position))

  return (
    <>
      <Flex>
        <QueueTitle>
          {queueTitle} ({sortedArray.length})
        </QueueTitle>
        {!noPrice && <QueueTitle noPrice>ETH</QueueTitle>}
      </Flex>
      {sortedArray.map(
        ({ price, desired, position, flagged, status }, index) =>
          index < restrict && (
            <Spot spot={index} type={type} key={desired}>
              <SpotProperty>{!noPrice && position}</SpotProperty>
              <SpotProperty style={{ flexBasis: '35px' }}>
                {flagged && <Flagged status={status} />}
              </SpotProperty>
              <SpotProperty style={{ maxWidth: '56%' }}>{desired}</SpotProperty>
              <SpotProperty>
                {!noPrice && parseFloat(price).toFixed(1)}
              </SpotProperty>
            </Spot>
          )
      )}
    </>
  )
}

export default QueueType
