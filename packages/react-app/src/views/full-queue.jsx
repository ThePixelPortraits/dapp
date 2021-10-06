import Queue from 'components/queue/display-queue'

import { FullQueue } from 'components/queue/queue.styled'
import { HeroQueue, PageTitle } from 'components/styled/App.styled'

const QueuePage = () => {
  return (
    <FullQueue>
      <PageTitle>queue</PageTitle>
      <HeroQueue>
        <Queue full />
      </HeroQueue>
    </FullQueue>
  )
}

export default QueuePage
