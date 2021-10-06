import { useContext, useEffect, Suspense, lazy } from 'react'

import { usePath } from 'hookrouter'

import Account from 'components/account/account'
import Header from 'components/ui/header'
import NavigationMenu from 'components/ui/navigation-menu'
import Loader from 'components/ui/widgets/loader'
import { AppContext } from 'context/AppContext'
import { Routes } from 'routes'

import { Flex } from './components/styled/flex.styled'
import {
  AppContainer,
  GlobalStyle,
  LayoutContainer,
} from 'components/styled/App.styled'

const NetworkDisplay = lazy(() => import('components/ui/network-display'))

function App() {
  const { navActive, setNavActive, wrongNetwork, dark, setDark } =
    useContext(AppContext)
  const path = usePath()

  const handleMenuClick = () => {
    setNavActive(!navActive)
  }

  useEffect(() => {
    setDark(path === '/zombies')
  }, [path])

  return (
    <>
      <GlobalStyle dark={dark} />
      {wrongNetwork && (
        <Suspense fallback={<Loader />}>
          <NetworkDisplay />
        </Suspense>
      )}
      <Flex style={{ justifyContent: 'center' }}>
        {navActive && <NavigationMenu handleCloseClick={handleMenuClick} />}
        <AppContainer dark={dark}>
          <Header />
          <Suspense fallback={<Loader />}>
            {path === '/' ? (
              <Routes />
            ) : (
              <LayoutContainer dark={dark}>
                <Routes />
              </LayoutContainer>
            )}
          </Suspense>
          <Account />
        </AppContainer>
      </Flex>
    </>
  )
}

export default App
