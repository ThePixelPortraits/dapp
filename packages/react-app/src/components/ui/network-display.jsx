import { useContext } from 'react'

import Alert from 'components/ui/widgets/alert'
import { AppContext } from 'context/AppContext'
import { NETWORKS, TARGET_NETWORK } from 'helpers/constants'

const targetNetwork = NETWORKS[TARGET_NETWORK]

const NetworkDisplay = () => {
  const { network } = useContext(AppContext)

  return (
    <Alert title="Wrong Network">
      <p>
        You have <b>{network.name}</b> selected and you need to be on
        <strong> {targetNetwork.name}</strong>.
      </p>
    </Alert>
  )
}

// window.ethereum &&
//   window.ethereum.on('chainChanged', () => {
//     window.location.reload()
//   })

export default NetworkDisplay
