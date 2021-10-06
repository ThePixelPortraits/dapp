import styled from 'styled-components'

export const Message = styled.div`
  display: none;
  position: absolute;
  z-index: 3;
  left: ${({ position }) => (position === 'left' ? '-210px' : 0)};
  top: ${({ position }) => (position === 'left' ? 0 : 'calc(-200%)')};
  background: rgba(40, 40, 40, 0.8);
  color: #fff;
  padding: 8px;
  width: 200px;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  word-break: keep-all;
`

export const Tooltip = styled.div`
  position: relative;
  cursor: help;

  &:hover ${Message} {
    display: flex;
  }
`
