import { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'

import { updateCompletedCommissionsMutation } from 'api/mutations/commissions'
import { getAcceptedCommissions } from 'api/queries/commissions'
import AcceptedPortaits from 'components/admin/queues/accepted-portraits'
import Button from 'components/ui/forms/button'
import PageSection from 'components/ui/page-section'
import Loader from 'components/ui/widgets/loader'
import useCheckAdmin from 'hooks/ui/useCheckAdmin'

import { ButtonGroup } from 'components/styled/page.styled'

const AdminAccepted = () => {
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)
  const [acceptedTicks, setAcceptedTicks] = useState(0)
  const [acceptedSelected, setAcceptedSelected] = useState([])

  const [updateCompletedCommissions] = useMutation(
    updateCompletedCommissionsMutation,
    {
      refetchQueries: [{ query: getAcceptedCommissions }],
    }
  )

  if (!account) {
    return <Loader />
  }

  if (!isAdmin) {
    return null
  }

  const handleAcceptedTicks = e => {
    const selected = e.target.value
    setAcceptedTicks(e.target.checked ? acceptedTicks + 1 : acceptedTicks - 1)
    setAcceptedSelected(
      acceptedSelected.indexOf(selected) === -1
        ? [...acceptedSelected, selected]
        : acceptedSelected.filter(commission => commission !== selected)
    )
  }

  const clearAllCheckboxes = () => {
    document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
      checkbox.checked = false
    })
  }

  return (
    <PageSection
      pageTitle="accepted portraits"
      style={{ border: '1px solid #f5f5f5', background: '#fafafa' }}
      headerContent={
        <ButtonGroup>
          <Button
            disabled={acceptedTicks === 0}
            onClick={async () => {
              await updateCompletedCommissions({
                variables: { completed: true, ids: acceptedSelected },
              })
              setAcceptedTicks(0)
              setAcceptedSelected([])
              clearAllCheckboxes()
            }}
          >
            Complete
          </Button>
        </ButtonGroup>
      }
    >
      <AcceptedPortaits handleTickCount={handleAcceptedTicks} />
    </PageSection>
  )
}

export default AdminAccepted
