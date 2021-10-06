import Loader from 'components/ui/widgets/loader'

import { ModalContent, ModalTitle } from 'components/styled/page.styled'

const Submitting = () => (
  <ModalContent>
    <Loader />
    <ModalTitle>processing rescind</ModalTitle>
    <p>please confirm your transaction...</p>
  </ModalContent>
)

export default Submitting
