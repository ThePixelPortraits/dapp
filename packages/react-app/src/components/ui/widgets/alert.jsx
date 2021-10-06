import {
  Alert as AlertStyled,
  AlertTitle,
} from 'components/ui/widgets/styled/alert.styled'

const Alert = props => {
  const { children, title, extrastyles } = props

  return (
    <AlertStyled
      style={{
        ...extrastyles,
      }}
    >
      <AlertTitle>{title}</AlertTitle>
      {children}
    </AlertStyled>
  )
}

export default Alert
