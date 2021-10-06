import { useContext } from 'react'

import { MenuIcon } from 'components/ui/icons/menu'
import { AppContext } from 'context/AppContext'

import { NavContainer, BurgerMenu } from 'components/styled/navigation.styled'

const Navigation = () => {
  const { dark } = useContext(AppContext)
  const { navActive, setNavActive } = useContext(AppContext)

  const handleMenuClick = () => {
    setNavActive(!navActive)
  }

  return (
    <NavContainer>
      <BurgerMenu navActive={navActive}>
        <MenuIcon onClick={handleMenuClick} fill={dark ? '#fff' : '#000'} />
      </BurgerMenu>
    </NavContainer>
  )
}

export default Navigation
