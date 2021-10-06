import {
  Message,
  Tooltip as TooltipStyled,
} from 'components/ui/widgets/styled/tooltip.styled'

const Tooltip = ({ message, position, children }) => {
  return (
    <TooltipStyled>
      <Message position={position}>{message}</Message>
      {children}
    </TooltipStyled>
  )
}

export default Tooltip
