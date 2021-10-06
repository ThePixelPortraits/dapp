import styled from 'styled-components'

import Button from 'components/ui/forms/button'

import { Flex } from '../../components/styled/flex.styled'
import { theme } from 'themes/default.styled'

export const ZombieButton = styled(Button)`
  margin-left: auto;
  background: ${theme.colors.green};
  border: 1px solid ${theme.colors.green};
`
export const Description = styled(Flex)`
  border-bottom: 1px solid ${theme.colors.green};
  padding-bottom: 16px;
  margin-bottom: 16px;
`

export const ZombiesContainer = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-between;
`

export const ZombieError = styled.p`
  color: ${theme.colors.green};
  margin-left: auto;
`
