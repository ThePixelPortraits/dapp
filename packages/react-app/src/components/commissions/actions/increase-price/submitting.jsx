import Loader from 'components/ui/widgets/loader'

import { ModalContent, ModalTitle } from 'components/styled/page.styled'

const Submitting = ({ price }) => (
  <ModalContent>
    <Loader />
    <ModalTitle>
      processing price change:
      <br /> <strong>{parseFloat(price).toFixed(1)}</strong> ETH
    </ModalTitle>
    <p>please confirm your transaction...</p>
  </ModalContent>
)

export default Submitting
