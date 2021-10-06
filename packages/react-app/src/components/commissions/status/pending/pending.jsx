import { useState } from 'react'

import IncreasePrice from 'components/commissions/actions/increase-price/increase-price'
import RescindCommission from 'components/commissions/actions/rescind/rescind-commission'
import Rescinded from 'components/commissions/status/pending/rescinded'
import Actions from 'components/commissions/status/shared/actions'
import Message from 'components/commissions/status/shared/message'
import StatusTag from 'components/commissions/status/shared/tag'
import UpdateName from 'components/commissions/update-name/update-name'
import Modal from 'components/ui/modal'
import Loader from 'components/ui/widgets/loader'
import Tooltip from 'components/ui/widgets/tooltip'

import {
  CommissionItem,
  CommissionProperty,
  CommissionsContainer,
  CommissionGroup,
} from 'components/commissions/styled/pending.styled'

const Pending = ({ loading, error, data }) => {
  const [isNameModalVisible, setIsNameModalVisible] = useState(false)
  const [isPriceModalVisible, setIsPriceModalVisible] = useState(false)
  const [isRescindModalVisible, setIsRescindModalVisible] = useState(false)
  const [commissionId, setCommissionId] = useState(0)
  const [activeOnChainId, setActiveOnChainId] = useState(0)

  const handleNameClose = () => setIsNameModalVisible(false)
  const handlePriceClose = () => setIsPriceModalVisible(false)
  const handleRescindClose = () => setIsRescindModalVisible(false)

  if (loading || error) return <Loader />

  return data?.commissionsByUser.length > 0 ? (
    <>
      <CommissionsContainer>
        {data?.commissionsByUser.map(commission => {
          const {
            id,
            status,
            desired,
            price,
            beaten,
            beatenBy,
            onChainId,
            flagged,
          } = commission
          return status !== 'rescinded' ? (
            <CommissionItem key={id}>
              <img
                src="images/empty-portrait-3.png"
                alt={desired}
                width="112px"
                height="112px"
              />
              <CommissionGroup>
                <CommissionProperty style={{ flex: '0 0 35%' }}>
                  <Tooltip message={`commission #${onChainId}`}>
                    {desired}
                    <br />
                    {price} ETH
                    {beaten && <>beaten by #{beatenBy}</>}
                  </Tooltip>
                </CommissionProperty>
                <StatusTag commission={commission} />

                {status === 'queued' || status === 'beaten' ? (
                  <Actions
                    commission={commission}
                    setIsNameModalVisible={setIsNameModalVisible}
                    setIsPriceModalVisible={setIsPriceModalVisible}
                    setIsRescindModalVisible={setIsRescindModalVisible}
                    setCommissionId={setCommissionId}
                    setActiveOnChainId={setActiveOnChainId}
                  />
                ) : (
                  <>{status === 'accepted' && <Message flagged={flagged} />}</>
                )}
              </CommissionGroup>
            </CommissionItem>
          ) : (
            <Rescinded key={id} commission={commission} itemKey={id} />
          )
        })}
      </CommissionsContainer>
      <Modal
        title={`change name of #${activeOnChainId}`}
        visible={isNameModalVisible}
        close={handleNameClose}
      >
        <UpdateName commissionId={commissionId} handleClose={handleNameClose} />
      </Modal>
      <Modal
        title={`increase bid for #${activeOnChainId}`}
        visible={isPriceModalVisible}
        close={handlePriceClose}
      >
        <IncreasePrice
          commissionId={commissionId}
          handleClose={handlePriceClose}
        />
      </Modal>
      <Modal
        title={`rescind commission #${activeOnChainId}`}
        visible={isRescindModalVisible}
        close={handleRescindClose}
      >
        <RescindCommission
          commissionId={commissionId}
          handleClose={handleRescindClose}
        />
      </Modal>
    </>
  ) : (
    <>you don't have any queued commissions!</>
  )
}

export default Pending
