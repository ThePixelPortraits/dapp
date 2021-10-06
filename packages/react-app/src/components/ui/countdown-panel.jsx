import { Digits, Panel, Unit } from 'components/ui/styled/countdown.styled'

const CountdownPanel = ({ unit, digits }) => {
  return (
    <Panel>
      <Unit>{unit}</Unit>
      <Digits>{digits}</Digits>
    </Panel>
  )
}

export default CountdownPanel
