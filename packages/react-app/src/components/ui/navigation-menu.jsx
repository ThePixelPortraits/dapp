import { useRef, useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'

import { getMemberCommissions } from 'api/queries/members'
import Close from 'components/ui/close'
import useCheckAdmin from 'hooks/ui/useCheckAdmin'

import {
  NavItem,
  NavMenu,
  NavLink,
  Sidebar,
} from 'components/styled/navigation.styled'

const NavigationMenu = ({ handleCloseClick }) => {
  const ref = useRef()
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)
  const { data } = useQuery(getMemberCommissions, {
    variables: { address: account },
  })

  const handleClick = e => {
    if (ref.current.contains(e.target)) {
      return
    }

    handleCloseClick()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [handleClick])

  return (
    <Sidebar ref={ref}>
      <NavMenu>
        <NavItem>
          <NavLink href="/" onClick={handleCloseClick}>
            commissions
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/queue" onClick={handleCloseClick}>
            queue
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/manifesto" onClick={handleCloseClick}>
            manifesto
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/gallery" onClick={handleCloseClick}>
            gallery
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/the-team" onClick={handleCloseClick}>
            the team
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/terms" onClick={handleCloseClick}>
            terms
          </NavLink>
        </NavItem>
        {account && data?.membersCommissions.length > 0 && (
          <NavItem
            style={{
              marginTop: '20px',
              borderTop: '1px dashed',
              paddingTop: '20px',
            }}
          >
            pixelfam
            <NavItem>
              <NavLink href="/zombies" onClick={handleCloseClick}>
                zombies
              </NavLink>
            </NavItem>
          </NavItem>
        )}
        {isAdmin && (
          <NavItem
            style={{
              marginTop: '20px',
              borderTop: '1px dashed',
              paddingTop: '20px',
            }}
          >
            admin
            <NavItem>
              <NavLink href="/admin/mint" onClick={handleCloseClick}>
                mint
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/zombies" onClick={handleCloseClick}>
                zombies
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/accepted" onClick={handleCloseClick}>
                accepted
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/queued" onClick={handleCloseClick}>
                queue
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/pending" onClick={handleCloseClick}>
                pending
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/beaten" onClick={handleCloseClick}>
                beaten
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/configs" onClick={handleCloseClick}>
                configs
              </NavLink>
            </NavItem>
          </NavItem>
        )}
      </NavMenu>
      <Close handleCloseClick={handleCloseClick} />
    </Sidebar>
  )
}

export default NavigationMenu
