import { WarningIcon } from '../icons/warning'

import Tooltip from 'components/ui/widgets/tooltip'

import { theme } from 'themes/default.styled'

const Flagged = ({ admin, status, withMargin }) => {
  const text =
    status === 'accepted'
      ? 'please email us from a different address or dm us on twitter!'
      : 'duplicate character! please change name or pop us a dm on twitter!!'

  return admin ? (
    <WarningIcon fill={theme.colors.lightRed} />
  ) : (
    <div
      style={{
        marginLeft: withMargin ? '16px' : 0,
      }}
    >
      <Tooltip message={text}>
        <WarningIcon fill={theme.colors.lightRed} />
      </Tooltip>
    </div>
  )
}

export default Flagged
