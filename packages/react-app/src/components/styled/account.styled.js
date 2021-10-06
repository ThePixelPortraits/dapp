import styled from 'styled-components'

import Button from 'components/ui/forms/button'

import { Flex } from 'components/styled/flex.styled'
import { theme } from 'themes/default.styled'

export const AccountContainer = styled.div`
  position: fixed;
  right: 32px;
  top: 32px;

  @media ${theme.breakpoints.desktopDown} {
    position: absolute;
  }
`

export const AuthLink = styled(Button)`
  background: #c7a6f5;
  border-color: transparent;
  padding: 8px;
`

export const AuthContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0 30px 0;
`

export const Metamask = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
`

export const WalletConnect = styled.div`
  cursor: pointer;
  padding-top: 30px;
  margin-bottom: 20px;
`
