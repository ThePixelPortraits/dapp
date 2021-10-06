import Button from 'components/ui/forms/button'
import { TRANSACTION_URL } from 'helpers/constants'

import {
  ModalContent,
  ModalIcon,
  ModalTitle,
} from 'components/styled/page.styled'

const Success = ({ setSubmitted, tx, setTx, handleClose }) => (
  <ModalContent>
    <ModalIcon
      src="images/newCommission.jpeg"
      width="18%"
      alt="new commission"
    />
    <ModalTitle>your commission has been sent!</ModalTitle>
    <p>
      see transaction:
      <a
        href={`${TRANSACTION_URL()}${tx.hash}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {tx.hash.substring(0, 17) + '...'}
      </a>
    </p>
    <p>
      when it's your turn in line, the artist will reach out to you using the
      contact details you provided
    </p>
    <Button
      onClick={() => {
        setSubmitted(false)
        setTx({})
        handleClose()
      }}
      style={{ marginTop: '16px' }}
    >
      Close
    </Button>
  </ModalContent>
)

export default Success
