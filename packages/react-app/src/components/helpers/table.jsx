import { RescindIcon } from 'components/ui/icons/rescind'
import { StopIcon } from 'components/ui/icons/stop'

import { theme } from 'themes/default.styled'

export const getColumnType = (type, property, record, options) => {
  const columns = {
    createdAt: () => {
      const dateObj = new Date(parseInt(property))
      return <>{dateObj.toLocaleDateString('en-US')}</>
    },
    desired: () => (
      <span
        style={{
          cursor: 'pointer',
          color: theme.colors.blue,
          borderBottom: '1px ridge',
        }}
        onClick={() => {
          options.handleOpen()
          options.setCommissionId(record.id)
        }}
      >
        {record.desired}
      </span>
    ),
    flagged: () => (
      <span
        style={{ cursor: 'pointer' }}
        onClick={() => options.handleFlagClick(record.id, !record.flagged)}
      >
        {record.flagged ? 'unflag' : 'flag'}
      </span>
    ),
    delete: () => (
      <RescindIcon
        fill="#1890ff"
        onClick={() => options.handleDeleteClick(record.id)}
      />
    ),
    transaction: () => (
      <a href={`https://etherscan.io/address/${record.address}`}>link</a>
    ),
    inactive: () => (
      <StopIcon
        fill="#1890ff"
        onClick={() => options.handleInactiveClick(record.id)}
      />
    ),
  }

  return columns[type]
}
