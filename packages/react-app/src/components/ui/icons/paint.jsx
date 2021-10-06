import { Svg } from 'components/styled/icons.styled'

export const PaintIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="30px"
    height="30px"
    {...props}
  >
    <path d="M13 14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1v-1.4a3 3 0 0 1 2.35-2.92l5.87-1.3A1 1 0 0 0 20 7.4V7a1 1 0 0 0-1-1h-1V4h1a3 3 0 0 1 3 3v.4a3 3 0 0 1-2.35 2.92l-5.87 1.3a1 1 0 0 0-.78.98V14z" />
    <rect width="17" height="6" x="2" y="2" className="primary" rx="2" />
  </Svg>
)
