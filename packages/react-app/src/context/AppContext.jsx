import { createContext, useEffect, useState } from 'react'

import { Contract } from '@ethersproject/contracts'
import { formatEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'

import {
  NETWORKS,
  PIXELS_ABI,
  PIXELS_ADDRESS,
  TARGET_NETWORK,
} from 'helpers/constants'

const targetNetwork = NETWORKS[TARGET_NETWORK]

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const { library, account } = useWeb3React()
  const [contextProps, setContextProps] = useState({})
  const [navActive, setNavActive] = useState(false)
  const [dark, setDark] = useState(false)

  const getContract = async (network, signer, name) => {
    if (network?.chainId !== targetNetwork?.chainId) {
      setContextProps({
        wrongNetwork: true,
        network,
        name,
      })
      return
    }

    const pixelsContract = new Contract(PIXELS_ADDRESS, PIXELS_ABI, signer)

    setContextProps({
      minBid: parseFloat(formatEther(await pixelsContract.minBid())),
      adminAddress: await pixelsContract?.admin(),
      wrongNetwork: false,
      pixelsContract,
      name,
      network,
    })
  }

  useEffect(async () => {
    const network = await library?.getNetwork()
    const signer = await library?.getSigner()
    const name = await library?.lookupAddress(account)

    if (network && signer) {
      await getContract(network, signer, name)
    }
  }, [library])

  return (
    <AppContext.Provider
      value={{
        getContract,
        ...contextProps,
        navActive,
        setNavActive,
        dark,
        setDark,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
