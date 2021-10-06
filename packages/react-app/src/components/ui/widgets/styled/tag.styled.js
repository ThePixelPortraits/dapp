import styled from 'styled-components'

import { theme } from 'themes/default.styled'

const getType = type => {
  switch (type) {
    case 'danger':
      return {
        color: theme.colors.red,
        background: theme.colors.pastelRed,
        border: `1px solid ${theme.colors.lightRed}`,
      }
    default:
      return {
        background: theme.colors.pastelPurple,
        border: `1px solid ${theme.colors.lightPurple}`,
        color: '#000',
      }
  }
}

export const Tag = styled.span`
  ${({ type }) => getType(type)}
  display: inline-block;
  padding: 4px 8px;
  margin-left: 10px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 1.5715;
  height: auto;
  white-space: nowrap;
  border-radius: 2px;
  cursor: pointer;

  @media ${theme.breakpoints.tabletDown} {
    margin-left: 0;
  }
`
