import { useEffect, useRef } from 'react'

import { CloseIcon } from 'components/ui/icons/close'
import { useOutsideClick } from 'hooks/ui/useOutsideClick'

import {
  Container,
  ModalStyled,
  Title,
  Content,
} from 'components/styled/modal.styled'

const Modal = ({ visible, title, children, close, width, noHeader }) => {
  const ref = useRef()

  useOutsideClick(ref, close)
  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'visible'
  }, [visible])

  return visible ? (
    <Container>
      <ModalStyled ref={ref} width={width}>
        {!noHeader && (
          <Title>
            <span>{title}</span>
            <CloseIcon style={{ marginLeft: 'auto' }} onClick={close} />
          </Title>
        )}
        <Content>{children}</Content>
      </ModalStyled>
    </Container>
  ) : null
}

export default Modal
