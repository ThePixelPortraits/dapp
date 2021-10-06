import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const Metric = styled.div`
  width: calc(30% - 16px);
  border: 1px solid #eee;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.pastelPurple};
`

export const MetricValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`
export const MetricText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  margin-top: auto;
`
