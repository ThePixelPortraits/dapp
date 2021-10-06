import { useContext } from 'react'

import { A } from 'hookrouter'

import Navigation from 'components/ui/navigation'
import { AppContext } from 'context/AppContext'

import { Logo, HeaderContainer } from 'components/styled/header.styled'
import { NavGroup } from 'components/styled/navigation.styled'

const Header = () => {
  const { dark } = useContext(AppContext)

  return (
    <HeaderContainer>
      <NavGroup>
        <Navigation />
      </NavGroup>
      <NavGroup center>
        <A href="/">
          <Logo
            width="300px"
            height="156px"
            dark={dark}
            src="/images/logo_color.svg"
            alt="the pixel portraits"
          />
        </A>
      </NavGroup>
    </HeaderContainer>
  )
}

export default Header
