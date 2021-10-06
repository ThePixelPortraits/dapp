import { useQuery } from '@apollo/react-hooks'

import { getQueue } from 'api/queries/queue'
import QueueType from 'components/queue/display-queue-type'
import Loader from 'components/ui/widgets/loader'

import { QueueContainer } from 'components/queue/queue.styled'
import { PageLink } from 'components/styled/page.styled'

const Queue = ({ full }) => {
  const { loading, error, data } = useQuery(getQueue, {
    pollInterval: 30000,
  })

  if (loading || error) return <Loader />

  const acceptedCount = data.queue.reduce(
    (n, { status }) => n + (status === 'accepted'),
    0
  )
  const queuedCount = data.queue.reduce(
    (n, { status }) => n + (status === 'queued'),
    0
  )

  return (
    <QueueContainer>
      {data?.queue?.length === 0 && <>the queue is empty!</>}
      {acceptedCount > 0 && (
        <QueueType
          queue={data?.queue}
          queueTitle="in production"
          type="accepted"
          noPrice
          full={full}
          limit={5}
        />
      )}
      {queuedCount > 0 && (
        <QueueType
          queue={data?.queue}
          type="queued"
          queueTitle="current queue"
          full={full}
        />
      )}
      {!full && <PageLink href="/queue">full queue &gt;</PageLink>}
    </QueueContainer>
  )
}

export default Queue
