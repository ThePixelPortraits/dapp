import { Svg } from 'components/styled/icons.styled'

export const IncreaseBidIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill={props.fill || '#000000'}
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
  </Svg>
)
