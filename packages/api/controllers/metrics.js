import { Commissions } from '../models/Commissions.js'

// get metrics
export const apiGetMetrics = async () => {
  try {
    const queuedCommissions = await Commissions.find({ status: 'queued' })
    const acceptedCommissions = await Commissions.find({ status: 'accepted' })
    const completedCommissions = await Commissions.find({ status: 'completed' })
    const zombieCommission = await Commissions.find({ zombieStatus: true })
    const zombieCompleteCommissions = await Commissions.find({
      zombieComplete: true,
    })
    let queueTotal = 0

    for (const commission of queuedCommissions) {
      queueTotal += commission.price
    }

    return {
      count: queuedCommissions.length,
      acceptedCount: acceptedCommissions.length,
      completedCount: completedCommissions.length,
      zombieCount: zombieCommission.length,
      zombieCompleteCount: zombieCompleteCommissions.length,
      totalPrice: queueTotal.toFixed(2),
    }
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
