import { useContext, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import CommissionQueue from 'components/admin/queues/commission-queue'
import Button from 'components/ui/forms/button'
import PageSection from 'components/ui/page-section'
import Loader from 'components/ui/widgets/loader'
import { AppContext } from 'context/AppContext'
import useCheckAdmin from 'hooks/ui/useCheckAdmin'

import { ButtonGroup } from 'components/styled/page.styled'

const AdminQueued = () => {
  const { pixelsContract } = useContext(AppContext)
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)
  const [queueTicks, setQueueTicks] = useState(0)
  const [queueSelected, setQueueSelected] = useState([])

  if (!account) {
    return <Loader />
  }

  if (!isAdmin) {
    return null
  }

  const handleQueueTicks = e => {
    const selected = e.target.value
    setQueueTicks(e.target.checked ? queueTicks + 1 : queueTicks - 1)
    setQueueSelected(
      queueSelected.indexOf(selected) === -1
        ? [...queueSelected, selected]
        : queueSelected.filter(commission => commission !== selected)
    )
  }

  const clearAllCheckboxes = () => {
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
      checkbox.checked = false
    })
  }

  return (
    <PageSection
      pageTitle="commission queue"
      style={{ border: '1px solid #f5f5f5', background: '#fafafa' }}
      headerContent={
        <ButtonGroup>
          <Button
            disabled={queueTicks === 0}
            onClick={async () => {
              await pixelsContract.processCommissions(queueSelected)
              clearAllCheckboxes()
            }}
          >
            Accept
          </Button>
        </ButtonGroup>
      }
    >
      <CommissionQueue handleTickCount={handleQueueTicks} />
    </PageSection>
  )
}

export default AdminQueued
