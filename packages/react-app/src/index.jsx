import { ApolloProvider } from '@apollo/react-hooks'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import ReactDOM from 'react-dom'

import App from 'App'
import { AppProvider } from 'context/AppContext'
import { apiClient } from 'helpers/apollo'

export const getLibrary = provider => {
  return new Web3Provider(provider)
}

ReactDOM.render(
  <ApolloProvider client={apiClient}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppProvider>
        <App />
      </AppProvider>
    </Web3ReactProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
