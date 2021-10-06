import { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'

import useCheckAdmin from '../../hooks/ui/useCheckAdmin'

import { completeZombiesMutation } from 'api/mutations/members'
import { getZombies } from 'api/queries/members'
import QueueZombies from 'components/admin/queues/zombies'
import Button from 'components/ui/forms/button'
import PageSection from 'components/ui/page-section'

import { ButtonGroup } from 'components/styled/page.styled'

const AdminZombies = () => {
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)
  const [queueTicks, setQueueTicks] = useState(0)
  const [queueSelected, setQueueSelected] = useState([])
  const [completeZombies] = useMutation(completeZombiesMutation, {
    refetchQueries: [{ query: getZombies }],
  })

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
      pageTitle="zombies"
      style={{ border: '1px solid #f5f5f5', background: '#fafafa' }}
      headerContent={
        <ButtonGroup>
          <Button
            disabled={queueTicks === 0}
            onClick={async () => {
              await completeZombies({
                variables: { ids: queueSelected },
              })
              setQueueTicks(0)
              setQueueSelected([])
              clearAllCheckboxes()
            }}
          >
            Accept
          </Button>
        </ButtonGroup>
      }
    >
      <QueueZombies handleTickCount={handleQueueTicks} />
    </PageSection>
  )
}

export default AdminZombies
