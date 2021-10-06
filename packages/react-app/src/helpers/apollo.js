import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const clientApi = '/api'

const uploadLink = createUploadLink({
  uri:
    window.location.hostname === 'localhost'
      ? process.env.REACT_APP_GRAPHQL_ENDPOINT
      : clientApi,
  headers: {
    'keep-alive': 'true',
  },
})

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
})
