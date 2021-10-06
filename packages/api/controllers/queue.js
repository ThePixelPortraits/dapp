import { Commissions } from '../models/Commissions.js'

// get queue
export const apiGetQueue = async () => {
  try {
    return await Commissions.find({
      position: { $ne: null },
      $or: [{ status: 'queued' }, { status: 'accepted' }],
    }).sort({
      position: 1,
    })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
