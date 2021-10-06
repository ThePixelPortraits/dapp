import { makeExecutableSchema } from '@graphql-tools/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
import { GraphQLUpload } from 'graphql-upload'

const resolveFunctions = {
  JSONObject: GraphQLJSONObject,
  UploadS3: GraphQLUpload,
}

const schemaString = `
	scalar JSONObject
  scalar UploadS3

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Commission {
    id: ID
		address: String!
		twitter: String!
		email: String
    price: String!
    desired: String!
    altNames: [String]
    notes: String
		status: String!
		beatenBy: String
		beatenByPrice: String
		onChainId: String
		position: String
		lastBlockNumber: String
		createdAt: String
		image: String
		flagged: Boolean
		presale: Boolean
		zombieStatus: Boolean
		zombieComplete: Boolean
  }
  
  type Config {
    minBid: String!
    adminAddress: String!
		currentBlock: String!
  }
  
  type Query {
    admin(address: String!): JSONObject
    commissions: [Commission!]!
    membersCommissions(address: String!): JSONObject
    commissionsCount: String!
    commission(id: String!): Commission!
		topCommissionPrice: JSONObject
    commissionsAccepted: [Commission!]!
		commissionsBeaten: [Commission!]!
    commissionsUnaccepted: [Commission!]!
    commissionsPending: [Commission!]!
    commissionsByUser(address: String!): [Commission!]!
		commissionsByName(name: String): [Commission!]!
    commissionsByUserCompleted(address: String!): JSONObject
    zombies: [Commission!]!
		position(price: String): JSONObject
		minPrice(name: String): JSONObject
    gallery(limit: Int, offset: Int): JSONObject
    configs: [Config!]!
    queue: [Commission!]!
    metrics: JSONObject
  }
  
  type Mutation {
    createCommission(address: String!, price: String!, desired: String!, twitter: String!, email: String, notes: String, image: UploadS3): Commission!
    updateCommission(id: String!, name: String!, price: String!, desired: String!): [Commission!]!
    removeCommission(id: String!): JSONObject
    updateCommissionBid(commission: JSONObject!): [Commission!]!
    updateCommissionAltNames(id: String!, altNames: [String!]!): [Commission!]!
    updateCommissionQueue(ids: [String!]!): [Commission!]!
    updateCompletedCommissions(ids: [String!]!): [Commission!]!
    updateInactiveCommissions(ids: [String!]!): [Commission!]!
    updateMinBid(minBid: Float!): [Config!]!
    flagCommissions(ids: [String!]!, flagged: Boolean): [Commission!]!
    registerZombies(address: String!, ids: [String!]!): [Commission!]!
    completeZombies(ids: [String!]!): [Commission!]!
    uploadMintImage(image: UploadS3!): JSONObject
    uploadNFTMetadata(metadata: JSONObject!): JSONObject
  }
`

makeExecutableSchema({ typeDefs: schemaString, resolvers: resolveFunctions })

export default schemaString
