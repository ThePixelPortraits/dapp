import Loader from 'components/ui/widgets/loader'

import { ModalContent, ModalTitle } from 'components/styled/page.styled'

const Submitting = ({ name, price }) => (
  <ModalContent>
    <Loader />
    <ModalTitle>
      processing commission:
      <br /> <strong>{name}</strong> -{' '}
      <strong>{parseFloat(price).toFixed(1)} ETH</strong>
    </ModalTitle>
    <p>please confirm your transaction...</p>
  </ModalContent>
)

export default Submitting
