import { CloseIcon } from 'components/ui/icons/close'

import { theme } from 'themes/default.styled'

const ValidationIcon = () => {
  return (
    <CloseIcon
      fill={theme.colors.red}
      handleCloseClick={null}
      style={{
        paddingTop: '2px',
        color: theme.colors.red,
        height: '15px',
        width: '15px',
        marginRight: '15px',
      }}
    />
  )
}

export default ValidationIcon
