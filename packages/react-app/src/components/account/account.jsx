import { useEffect, useState, useContext } from 'react'

import { useWeb3React } from '@web3-react/core'

import AccountModal from './account-modal'

import { LoginIcon } from 'components/ui/icons/login'
import { LogoutIcon } from 'components/ui/icons/logout'
import { AppContext } from 'context/AppContext'
import { injected, walletConnect } from 'helpers/constants'
import useMediaQuery from 'hooks/ui/useMediaQuery'

import { Flex } from '../styled/flex.styled'
import { AccountContainer, AuthLink } from 'components/styled/account.styled'
import { theme } from 'themes/default.styled'

const Account = () => {
  const { activate, deactivate, active } = useWeb3React()
  const { name } = useContext(AppContext)
  const walletConnectConnector = walletConnect
  const isTablet = useMediaQuery(theme.breakpoints.tabletDown)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const handleClose = () => setIsModalVisible(false)
  const handleOpen = () => setIsModalVisible(true)

  useEffect(async () => {
    await activate(injected)
  }, [activate, walletConnectConnector, name])

  const handleBodyScroll = () => {
    document.body.style.overflow = 'visible'
  }

  const handleLoginClick = async metamask => {
    await activate(metamask ? injected : walletConnectConnector)
    handleBodyScroll()
    handleClose()
  }

  const handleLogoutClick = async () => {
    await deactivate()
  }

  return (
    <AccountContainer>
      {isTablet ? (
        active ? (
          <LogoutIcon onClick={handleLogoutClick} />
        ) : (
          <LoginIcon onClick={() => handleLoginClick(false)} />
        )
      ) : active ? (
        <Flex style={{ alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '16px' }}>{name}</div>
          <AuthLink key="logout-button" onClick={handleLogoutClick}>
            logout
          </AuthLink>
        </Flex>
      ) : (
        <AuthLink onClick={handleOpen}>login</AuthLink>
      )}
      <AccountModal
        isModalVisible={isModalVisible}
        handleClose={handleClose}
        handleLoginClick={handleLoginClick}
      />
    </AccountContainer>
  )
}

export default Account
