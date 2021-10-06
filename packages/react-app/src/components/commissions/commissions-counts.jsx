import { useContext } from 'react'

// import { useQuery } from '@apollo/react-hooks'
// import { useSpring, animated } from 'react-spring'

import { useWeb3React } from '@web3-react/core'

import CreateButton from 'components/commissions/ui/create-button'
import { AppContext } from 'context/AppContext'
import useMediaQuery from 'hooks/ui/useMediaQuery'

// import { getCommissionsCount } from 'api/queries/commissions'

import { Count } from 'components/commissions/styled/count.styled'
import { Flex } from 'components/styled/flex.styled'
import { theme } from 'themes/default.styled'

const CommissionsCount = ({ handleOpen }) => {
  const { active } = useWeb3React()
  const { wrongNetwork } = useContext(AppContext)
  const isTablet = useMediaQuery(theme.breakpoints.tabletDown)
  // const { loading, error, data } = useQuery(getCommissionsCount, {
  //   pollInterval: 20000,
  // })
  // const animation = useSpring({
  //   to: { opacity: 1 },
  //   from: { opacity: 0 },
  //   delay: 200,
  // })
  // const totalLeft = 945 - data?.commissionsCount

  return (
    <>
      <Count>
        <Flex
          style={{
            // alignItems: 'center',
            // justifyContent: 'center',
            width: '60vw',
            textAlign: 'center',
            flexDirection: 'column',
          }}
        >
          <strong style={{ fontSize: '32px', marginRight: '10px' }}>
            {/* {loading || error ? '...' : <animated.div style={animation} />} */}
          </strong>
          {/* &nbsp;commissions placed ! */}
          production paused while we get the new contract up & running!
          <br />
          feel free to join the queue for when we resume in october!
        </Flex>
        {!wrongNetwork && active && (
          <CreateButton
            setOpen={handleOpen}
            align="left"
            style={{ width: isTablet && '100%', marginTop: '32px' }}
          />
        )}
      </Count>
    </>
  )
}

export default CommissionsCount
