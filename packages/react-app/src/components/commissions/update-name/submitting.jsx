import Loader from 'components/ui/widgets/loader'

import { ModalContent, ModalTitle } from 'components/styled/page.styled'

const Submitting = ({ name }) => (
  <ModalContent>
    <Loader />
    <ModalTitle>
      processing name change:
      <br /> <strong>{name}</strong>
    </ModalTitle>
    <p>please confirm your transaction...</p>
  </ModalContent>
)

export default Submitting
