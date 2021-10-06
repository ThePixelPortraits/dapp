import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const CommissionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2em;
`

export const CommissionItem = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(20% - 10px);
  margin: 0 10px 20px 0;
  border: 1px solid #e9e9e9;

  @media ${theme.breakpoints.tabletDown} {
    min-width: 100%;
  }
`

export const CommissionTag = styled.div`
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translate(-50%, 0);
`

export const CommissionProperty = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  margin: ${({ title }) => (title ? '20px 0 5px 0' : '15px 0')};
  color: #000;
`

export const CommissionActions = styled.div`
  display: flex;
  flex-direction: column;
  > button {
    margin: 5px 0;
  }
`
