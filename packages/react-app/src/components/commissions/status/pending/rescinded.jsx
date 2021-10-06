import Tag from 'components/ui/widgets/tag'
import Tooltip from 'components/ui/widgets/tooltip'

import {
  CommissionItem,
  CommissionProperty,
  CommissionTag,
  CommissionGroup,
} from 'components/commissions/styled/pending.styled'

const Rescinded = ({ itemKey, commission }) => {
  const { status, desired, price, onChainId } = commission

  return (
    <CommissionItem key={itemKey}>
      <img
        src="images/empty-portrait-3.png"
        alt={desired}
        style={{ filter: 'grayscale(1)' }}
        width="112px"
        height="112px"
      />
      <CommissionGroup>
        <CommissionProperty style={{ flex: '0 0 35%' }}>
          <Tooltip message={`commission #${onChainId}`}>
            {desired}
            <br />
            {price} ETH
          </Tooltip>
        </CommissionProperty>
        <CommissionTag>
          <Tag type="danger">{status}</Tag>
        </CommissionTag>
      </CommissionGroup>
    </CommissionItem>
  )
}

export default Rescinded
