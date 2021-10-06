import { Button as StyledButton } from 'components/styled/page.styled'

const Button = props => {
  const { children, extrastyles, type } = props

  return (
    <StyledButton
      element={type}
      style={{
        ...extrastyles,
      }}
      type="submit"
      {...props}
    >
      {children}
    </StyledButton>
  )
}

export default Button
