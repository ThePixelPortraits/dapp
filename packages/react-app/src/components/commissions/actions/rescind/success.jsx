import { useContext } from 'react'

import Button from 'components/ui/forms/button'
import { AppContext } from 'context/AppContext'
import { TRANSACTION_URL } from 'helpers/constants'

import {
  ModalContent,
  ModalIcon,
  ModalTitle,
} from 'components/styled/page.styled'

const Success = ({ tx, handleClose, setSubmitted, setFormError }) => {
  const { network } = useContext(AppContext)
  return (
    <ModalContent>
      <ModalIcon
        src="images/rescindCommission.jpeg"
        width="30%"
        alt="rescind commission"
      />
      <ModalTitle>your commission has been rescinded!</ModalTitle>

      <p>
        see transaction:
        <a
          href={`${TRANSACTION_URL(network.name)}${tx.hash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {tx.hash.substring(0, 17) + '...'}
        </a>
      </p>
      <Button
        onClick={() => {
          setSubmitted(false)
          setFormError('')
          handleClose()
        }}
      >
        Close
      </Button>
    </ModalContent>
  )
}

export default Success
