import { Svg } from 'components/styled/icons.styled'

export const MenuIcon = props => (
  <Svg
    svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0H32V2H0V0Z"
      fill={props.fill || '#000'}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 15H32V17H0V15Z"
      fill={props.fill || '#000'}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 30H32V32H0V30Z"
      fill={props.fill || '#000'}
    />
  </Svg>
)
