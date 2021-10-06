import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const NameAndPrice = styled.div`
  display: flex;
  gap: 15px;

  @media ${theme.breakpoints.tabletDown} {
    flex-direction: column;
    gap: 5px;
  }
`

export const NameContainer = styled.div`
  width: 75%;

  @media ${theme.breakpoints.tabletDown} {
    width: 100%;
  }
`

export const PriceContainer = styled.div`
  width: 25%;

  @media ${theme.breakpoints.tabletDown} {
    width: 100%;
  }
`
