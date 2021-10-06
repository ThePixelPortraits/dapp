import mongoose from 'mongoose'

const SchemaTypes = mongoose.Schema.Types
const Schema = mongoose.Schema

const commissions = new Schema(
  {
    twitter: { type: String, required: true },
    email: { type: String, required: false },
    address: { type: String, required: true },
    price: { type: SchemaTypes.Number, required: true },
    desired: { type: String, required: true },
    altNames: [{ type: String, required: false }],
    desiredSlug: { type: String, required: false },
    notes: { type: String, required: false },
    beatenBy: { type: String, required: false },
    beatenByPrice: { type: SchemaTypes.Number, required: false },
    onChainId: { type: SchemaTypes.Number, required: false },
    status: { type: String, required: false },
    zombieStatus: { type: Boolean, required: false },
    zombieComplete: { type: Boolean, required: false },
    presale: { type: Boolean, required: false },
    position: { type: SchemaTypes.Number, required: false },
    lastBlockNumber: { type: SchemaTypes.Number, required: false },
    image: { type: String, required: false },
    flagged: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
)

export const Commissions = mongoose.model('Commission', commissions)
