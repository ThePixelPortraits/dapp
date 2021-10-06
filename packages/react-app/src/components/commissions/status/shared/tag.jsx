import Flagged from 'components/ui/widgets/flagged'
import Tag from 'components/ui/widgets/tag'

import { CommissionTag } from 'components/commissions/styled/pending.styled'

const StatusTag = ({ commission }) => {
  const { status, position, beatenByPrice, flagged } = commission
  return (
    <CommissionTag>
      {status !== 'beaten' ? (
        <Tag>{status === 'queued' ? `#${position} in queue` : status}</Tag>
      ) : (
        <>
          <Tag type="danger">beaten by bid of {beatenByPrice} ETH</Tag>
        </>
      )}
      {flagged && <Flagged status={status} withMargin />}
    </CommissionTag>
  )
}

export default StatusTag
