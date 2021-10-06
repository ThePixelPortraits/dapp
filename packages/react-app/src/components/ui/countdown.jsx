import Countdown from 'react-countdown'

import CountdownPanel from 'components/ui/countdown-panel'

import {
  CountdownContainer,
  Block,
} from 'components/ui/styled/countdown.styled'

const CountdownBlock = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null
    }
    return (
      <Block>
        <p>
          THE PIXEL PORTRAITS STUDIO IS REOPEN!
          <br />
          <br />
          0.05 ETH SALE ON NEW PORTRAITS UNTIL SUNDAY EVENING!
        </p>
        <CountdownContainer>
          <CountdownPanel unit="days" digits={days} />
          <CountdownPanel unit="hours" digits={hours} />
          <CountdownPanel unit="mins" digits={minutes} />
          <CountdownPanel unit="secs" digits={seconds} />
        </CountdownContainer>
      </Block>
    )
  }
  return <Countdown date="2021-05-17T00:00:00Z" renderer={renderer} />
}

export default CountdownBlock
