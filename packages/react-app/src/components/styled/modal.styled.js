import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(122, 122, 122, 0.44);
  overflow-y: auto;

  @media ${theme.breakpoints.tabletDown} {
    height: 100%;
    background: #fff;
    justify-content: unset;
    align-items: unset;
  }
`

export const ModalStyled = styled.div`
  background: #fff;
  width: ${({ width }) => width || '45vw'};
  height: auto;
  font-size: 14px;

  @media ${theme.breakpoints.tabletDown} {
    width: 98%;
  }
`

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 500;
  font-size: 16px;
`

export const Content = styled.div`
  font-size: 14px;
  padding: 30px;
`
