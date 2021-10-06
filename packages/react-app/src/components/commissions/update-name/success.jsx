import { useContext } from 'react'

import Button from 'components/ui/forms/button'
import { AppContext } from 'context/AppContext'
import { TRANSACTION_URL } from 'helpers/constants'

import {
  ModalContent,
  ModalIcon,
  ModalTitle,
} from 'components/styled/page.styled'

const Success = ({ tx, setSubmitted, handleClose }) => {
  const { network } = useContext(AppContext)

  return (
    <ModalContent>
      <ModalIcon src="images/changeName.jpeg" width="30%" alt="change name" />
      <ModalTitle>Your commission has been updated!</ModalTitle>
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
          handleClose()
        }}
      >
        Close
      </Button>
    </ModalContent>
  )
}

export default Success
