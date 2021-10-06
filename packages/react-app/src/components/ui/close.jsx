import { CloseIcon } from 'components/ui/icons/close'

import { CloseContainer } from 'components/styled/close.styled'

const Close = ({ handleCloseClick }) => (
  <CloseContainer onClick={handleCloseClick}>
    <CloseIcon width="32px" height="32px" fill="#000" />
  </CloseContainer>
)

export default Close
