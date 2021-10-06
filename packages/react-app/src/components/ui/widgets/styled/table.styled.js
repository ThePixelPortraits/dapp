import styled from 'styled-components'

import { theme } from 'themes/default.styled'

const getTableType = type => {
  const types = {
    beaten: theme.colors.pastelRed,
  }

  return types[type]
}

export const TableWrapper = styled.div`
  margin: 16px;
`

export const TableContainer = styled.table`
  background: #fff;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`

export const ColumnHeader = styled.th`
  text-align: left;
  border-bottom: 1px solid #999;
  padding: 16px;
  background: ${({ type }) => getTableType(type)};
`

export const TableCell = styled.td`
  border-bottom: 1px solid #eee;
  padding: 16px;
  word-break: break-all;
`

export const SelectionCell = styled.td`
  padding: 16px 30px;
`
