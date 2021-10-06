import { A } from 'hookrouter'
import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const NavContainer = styled.nav`
  display: flex;
  margin-right: auto;
`

export const BurgerMenu = styled.div`
  position: fixed;
  top: 32px;
  left: 32px;
  z-index: 2;
  display: ${({ navActive }) => (navActive ? 'none' : 'block')};

  @media ${theme.breakpoints.desktopDown} {
    position: absolute;
  }
`

export const NavGroup = styled.div`
  display: flex;
  width: 33%;
  justify-content: ${({ center }) => (center ? 'center' : 'left')};
`

export const Sidebar = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  z-index: 2;
  height: 100vh;
  width: 300px;
  position: sticky;
  top: 0;
  background: #c7a6f5;

  @media ${theme.breakpoints.desktopDown} {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
  }
`

export const NavMenu = styled.ul`
  padding-left: 0;
  list-style-type: none;
`

export const NavItem = styled.li`
  font-family: 'Cutive Mono';
  font-size: 1.5rem;
  color: #000;

  li {
    margin-left: 16px;
    font-size: 20px;
  }
`

export const NavLink = styled(A)`
  color: #000;

  &:hover {
    color: #fff;
  }
`
