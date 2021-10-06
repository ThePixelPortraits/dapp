import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const Portrait = styled.div`
  position: relative;
  display: flex;
  width: calc(20% - 10px);
  height: 100%;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid;
  padding: 8px;
  cursor: ${({ zombie }) => !zombie && 'pointer'};
  color: ${({ selected, zombie }) => (selected || zombie) && '#000'};
  background: ${({ selected, zombie }) =>
    selected || zombie ? theme.colors.green : ''};

  @media ${theme.breakpoints.tabletDown} {
    width: calc(50% - 10px);
  }
`

export const Presale = styled.span`
  font-size: 14px;
  color: ${({ selected, zombie }) =>
    selected || zombie ? '#000' : theme.colors.orange};
`
