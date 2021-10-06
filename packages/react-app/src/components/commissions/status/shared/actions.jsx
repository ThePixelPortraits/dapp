import { ChangeNameIcon } from 'components/ui/icons/change-name'
import { IncreaseBidIcon } from 'components/ui/icons/increase-bid'
import { RescindIcon } from 'components/ui/icons/rescind'
import Tooltip from 'components/ui/widgets/tooltip'
import useMediaQuery from 'hooks/ui/useMediaQuery'

import {
  CommissionActionLink,
  CommissionActions,
} from 'components/commissions/styled/pending.styled'
import { theme } from 'themes/default.styled'

const Actions = ({
  commission,
  setIsNameModalVisible,
  setIsPriceModalVisible,
  setIsRescindModalVisible,
  setCommissionId,
  setActiveOnChainId,
}) => {
  const isTablet = useMediaQuery(theme.breakpoints.tabletDown)
  const { status } = commission

  const handleUpdateIds = (id, onChainId) => {
    setCommissionId(id)
    setActiveOnChainId(onChainId)
  }

  const handleUpdateNameClick = ({ id, onChainId }) => {
    handleUpdateIds(id, onChainId)
    setIsNameModalVisible(true)
  }

  const handleIncreasePriceClick = ({ id, onChainId }) => {
    handleUpdateIds(id, onChainId)
    setIsPriceModalVisible(true)
  }

  const handleRescindClick = ({ id, onChainId }) => {
    handleUpdateIds(id, onChainId)
    setIsRescindModalVisible(true)
  }

  return (
    <CommissionActions style={{ flex: '0 0 25%' }}>
      <CommissionActionLink
        onClick={() => handleIncreasePriceClick(commission)}
      >
        {isTablet ? (
          <>
            <IncreaseBidIcon
              fill={theme.colors.lightPurple}
              style={{ marginRight: '5px' }}
            />{' '}
            increase bid
          </>
        ) : (
          <Tooltip message="increase bid" position="left">
            <IncreaseBidIcon fill={theme.colors.lightPurple} />
          </Tooltip>
        )}
      </CommissionActionLink>

      <CommissionActionLink onClick={() => handleUpdateNameClick(commission)}>
        {isTablet ? (
          <>
            <ChangeNameIcon
              fill={theme.colors.lightPurple}
              style={{ marginRight: '5px' }}
            />{' '}
            change name
          </>
        ) : (
          <Tooltip message="change name" position="left">
            <ChangeNameIcon fill={theme.colors.lightPurple} />
          </Tooltip>
        )}
      </CommissionActionLink>
      {status === 'beaten' && (
        <CommissionActionLink onClick={() => handleRescindClick(commission)}>
          {isTablet ? (
            <>
              <RescindIcon
                fill={theme.colors.lightPurple}
                style={{ marginRight: '5px' }}
              />{' '}
              rescind bid
            </>
          ) : (
            <Tooltip
              message="rescind bid - you can raise your bid to regain this portrait name!"
              position="left"
            >
              <RescindIcon fill={theme.colors.lightPurple} />
            </Tooltip>
          )}
        </CommissionActionLink>
      )}
    </CommissionActions>
  )
}

export default Actions
