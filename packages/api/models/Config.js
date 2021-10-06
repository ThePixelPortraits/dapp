import mongoose from 'mongoose'

const Schema = mongoose.Schema
const SchemaTypes = mongoose.Schema.Types

const config = new Schema(
  {
    minBid: { type: SchemaTypes.Number, required: true },
    adminAddress: { type: String, required: true },
    currentBlock: { type: SchemaTypes.Number, required: true },
    currentNFTMetadata: { type: SchemaTypes.Number },
  },
  { timestamps: true }
)

export const Config = mongoose.model('Config', config)
