import { Tag as TagStyled } from 'components/ui/widgets/styled/tag.styled'

const Tag = props => {
  const { children, extrastyles, type } = props

  return (
    <TagStyled
      type={type}
      style={{
        ...extrastyles,
      }}
    >
      {children}
    </TagStyled>
  )
}

export default Tag
