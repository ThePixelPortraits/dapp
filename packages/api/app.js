import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import mongoose from 'mongoose'

import resolvers from './resolvers.js'
import typeDefs from './schema.js'
import { getSecrets } from './utils/aws'
import { isProduction } from './constants'

const app = express()
const subscriber = require('./subscriber/contract_subscriber').default

setTimeout(async () => {
  const secrets = await getSecrets()

  const MONGO_URL = isProduction
    ? secrets.MONGO_URI
    : 'mongodb://127.0.0.1:27017/thepixelportraits'

  mongoose.connect(MONGO_URL)
  mongoose.set('debug', true)
}, 1)

const startApolloServer = async () => {
  app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }))

  const server = new ApolloServer({
    uploads: false,
    cors: {
      origin: 'https://www.thepixelportraits.me',
    },
    typeDefs: gql(typeDefs),
    resolvers,
    context: ({ req, res }) => {
      return {
        req,
        res,
      }
    },
  })

  await server.start()
  server.applyMiddleware({ app, path: '/api' })
}

startApolloServer().then(() => {
  if (process.env.CONTRACT_SUBSCRIBER) {
    subscriber().catch(console.error)
  } else {
    app.listen({ port: 4000 }, () => {
      console.log('🖼  pixels api ready 🖼')
    })
  }
})

module.exports = app
