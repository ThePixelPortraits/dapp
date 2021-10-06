import { SpanButton } from 'components/styled/page.styled'

const Button = props => {
  const { children, extrastyles } = props

  return (
    <SpanButton
      style={{
        ...extrastyles,
      }}
      {...props}
    >
      {children}
    </SpanButton>
  )
}

export default Button
