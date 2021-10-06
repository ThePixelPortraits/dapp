import { useState } from 'react'

import ShowCommission from '../../admin/ui/show-commission'
import Modal from '../modal'

import { getColumnType } from 'components/helpers/table'

import {
  TableContainer,
  TableWrapper,
  ColumnHeader,
  TableCell,
  SelectionCell,
} from 'components/ui/widgets/styled/table.styled'

const Table = ({
  data,
  type,
  withSelection,
  handleTickCount,
  options,
  extraColumns = [],
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [commissionId, setCommissionId] = useState(0)
  const handleClose = () => setIsModalVisible(false)
  const handleOpen = () => setIsModalVisible(true)
  const removeColumns = ['__typename', 'id', 'onChainId', 'beatenBy']
  const keys = data[0] ? Object.keys(data[0]) : []
  let columnKeys = keys.filter(column => !removeColumns.includes(column))
  columnKeys = [...columnKeys, ...extraColumns]

  return (
    <TableWrapper>
      <TableContainer>
        <thead>
          <tr>
            {columnKeys?.map(column => (
              <ColumnHeader key={column} type={type}>
                {column}
              </ColumnHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(record => {
            const recordKeys = Object.entries(record).filter(
              entry => !removeColumns.includes(entry[0])
            )

            return (
              <tr key={record.id}>
                {Object.values(recordKeys)?.map(value => {
                  const customColumn = getColumnType(
                    value[0],
                    value[1],
                    record,
                    {
                      handleOpen,
                      setCommissionId,
                      ...options,
                    }
                  )

                  return (
                    <TableCell key={value[0]}>
                      {customColumn
                        ? customColumn()
                        : value[1] !== null && value[1].toString()}
                    </TableCell>
                  )
                })}
                {withSelection && (
                  <SelectionCell>
                    <input
                      type="checkbox"
                      onClick={e => handleTickCount(e)}
                      value={record.id}
                    />
                  </SelectionCell>
                )}
                {extraColumns.map(column => {
                  const customColumn = getColumnType(column, null, record, {
                    ...options,
                  })

                  return (
                    <TableCell key={customColumn}>{customColumn()}</TableCell>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </TableContainer>
      <Modal
        title={`viewing commission ${commissionId}`}
        visible={isModalVisible}
        close={handleClose}
      >
        <ShowCommission commisionId={commissionId} />
      </Modal>
    </TableWrapper>
  )
}

export default Table
