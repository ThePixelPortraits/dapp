import styled from 'styled-components'

import { theme } from 'themes/default.styled'

// import { theme } from 'themes/default.styled'

export const CommissionsContainer = styled.div`
  margin-top: 5px;
`

export const CommissionItem = styled.div`
  display: flex;
  height: 130px;
  position: relative;
  margin: 0 0 5px 0;
  border: 1px solid #e9e9e9;
  padding: 8px;

  @media ${theme.breakpoints.tabletDown} {
    height: auto;
    align-items: center;

    > img {
      width: 150px;
      height: 150px;
    }
  }
`

export const CommissionGroup = styled.div`
  display: flex;
  width: 100%;
  font-size: 14px;

  @media ${theme.breakpoints.tabletDown} {
    flex-direction: column;
  }
`

export const CommissionTag = styled.div`
  display: flex;
  align-items: center;

  @media ${theme.breakpoints.tabletDown} {
    width: 100%;
    margin-top: 10px;
  }
`

export const CommissionProperty = styled.div`
  display: flex;
  align-items: center;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  margin: 0;
  word-break: break-word;

  @media ${theme.breakpoints.tabletDown} {
    width: 100%;
  }
`

export const CommissionActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  @media ${theme.breakpoints.tabletDown} {
    margin: 8px 0 0 0;
  }

  p {
    margin: 0;
  }
`

export const CommissionActionLink = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  padding: 8px;

  @media ${theme.breakpoints.tabletUp} {
    justify-content: flex-end;
  }
`

export const CommissionDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;

  > span {
    display: flex;
    align-items: center;
    color: #1890ff;
    cursor: pointer;
    width: 100%;
    padding: 8px 0;
  }
`
