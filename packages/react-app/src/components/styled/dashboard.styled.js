import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const Dashboard = styled.div`
  display: flex;
  margin: -12px 0 0 -12px;
  width: calc(100% + 12px);

  @media ${theme.breakpoints.tabletDown} {
    flex-direction: column;
    padding-top: 0;
    margin: 0;
    width: auto;

    > * {
      margin: 0 0 12px 0;
    }
  }
`

export const Main = styled.div`
  width: 70%;

  @media ${theme.breakpoints.tabletDown} {
    width: 100%;
  }
`

export const Sidebar = styled.div`
  width: 30%;

  > * {
    &:first-child {
      margin-bottom: 15px;
    }
  }

  @media ${theme.breakpoints.tabletDown} {
    width: 100%;
    display: flex;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;

    > * {
      flex-grow: 1;
      flex-basis: 0;
      margin: 0 5px;
      align-items: stretch;

      &:first-child {
        margin-left: 0;
        margin-bottom: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`
