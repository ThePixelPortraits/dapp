import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 30px 40px;
  width: 100%;
`

export const Logo = styled.img`
  filter: ${({ dark }) => (dark ? 'invert(1)' : '')};

  @media ${theme.breakpoints.tabletDown} {
    width: 200px;
  }
`
