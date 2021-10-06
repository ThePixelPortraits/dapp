import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.red};
  margin: 0 0 95px 0;
  text-align: center;
`

export const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.pastelRed};
  border: 1px solid ${theme.colors.red};
  color: ${theme.colors.red};
  margin: 0 200px;
  border-radius: 3px;

  @media ${theme.breakpoints.tabletDown} {
    margin: 0;
  }
`

export const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 125px;
  height: 150px;

  @media ${theme.breakpoints.tabletDown} {
    width: 100px;
  }
`

export const Unit = styled.div`
  text-transform: lowercase;
  font-size: 1rem;
`

export const Digits = styled.div`
  font-size: 3rem;
`
