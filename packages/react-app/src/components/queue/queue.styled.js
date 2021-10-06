import styled from 'styled-components'

import { theme } from 'themes/default.styled'

// const getQueueStyling = (spot, theme) => {
//   switch (true) {
//     case spot === 0: {
//       return {
//         fontSize: '18px',
//         background: `rgb(${theme.colors.lightPurple40})`,
//       }
//     }
//     case spot === 1: {
//       return {
//         fontSize: '18px',
//         background: `rgb(${theme.colors.red40})`,
//       }
//     }
//     case spot === 2: {
//       return {
//         fontSize: '18px',
//         background: `rgb(${theme.colors.lightBlue40})`,
//       }
//     }
//     case spot === 3: {
//       return {
//         fontSize: '18px',
//         background: `rgb(${theme.colors.green40})`,
//       }
//     }
//     case spot === 4: {
//       return {
//         fontSize: '18px',
//         background: `rgb(${theme.colors.orange40})`,
//       }
//     }
//     case spot > 4 && spot < 15: {
//       return {
//         fontSize: '14px',
//       }
//     }
//     default:
//   }
// }

export const QueueContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const QueueTitle = styled.div`
  margin-bottom: 5px;
  margin-left: ${({ noPrice }) => (noPrice ? 'auto' : 0)};
`

export const Spot = styled.div`
  position: relative;
  font-size: 14px;
  margin-bottom: 2px;
  display: flex;
  width: 100%;
  background: ${({ type }) =>
    type === 'accepted' && `rgb(${theme.colors.green40})`};
`

export const SpotProperty = styled.div`
  justify-content: center;
  align-items: center;
  word-break: break-all;
  padding: 3px 5px 3px 5px;

  &:first-child {
    flex-basis: 40px;
  }

  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`

export const FullQueue = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
