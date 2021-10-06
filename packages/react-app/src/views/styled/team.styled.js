import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const Team = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;

  @media ${theme.breakpoints.tabletDown} {
    flex-direction: column;
  }
`

export const TeamMember = styled.div`
  width: 33%;

  @media ${theme.breakpoints.tabletDown} {
    width: 100%;
  }
`

export const Image = styled.img`
  width: ${({ width }) => width || '100%'};
`

export const Description = styled.div`
  padding-top: 16px;
`

export const Name = styled.p``
