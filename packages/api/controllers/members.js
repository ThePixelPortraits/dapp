import { Commissions } from '../models/Commissions.js'
import fetch from 'node-fetch'

// get commissions by user that are completed and presale
export const apiGetMembersCommissions = async ({ address }) => {
  try {
    const userCollection = await fetch(
      `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&owner=${address}&collection=the-pixel-portraits-og`
    )

    const { assets } = await userCollection.json()

    for (const portrait of assets) {
      const presaleCommission = await Commissions.find({
        $or: [
          { desired: portrait.name },
          { desired: portrait.name.toLowerCase() },
          { desired: portrait.name.replace(/ /g, '').toLowerCase() },
        ],
        presale: true,
      })

      const commission = await Commissions.find({
        address,
        $and: [
          { $or: [{ presale: null }, { presale: false }] },
          {
            $or: [
              { desired: portrait.name },
              { desired: portrait.name.toLowerCase() },
              { desired: portrait.name.replace(/ /g, '').toLowerCase() },
            ],
          },
        ],
      })

      portrait.commissionId = presaleCommission[0]
        ? presaleCommission[0]._id
        : commission[0]
        ? commission[0]._id
        : 0
      portrait.presale = presaleCommission.length > 0
      portrait.zombie = presaleCommission[0]
        ? Boolean(presaleCommission[0].zombieStatus)
        : commission[0]
        ? Boolean(commission[0].zombieStatus)
        : false
    }

    return await assets
  } catch (err) {
    console.log(err)
    throw new Error(`Error: ${err}`)
  }
}

export const apiRegisterZombies = async ({ address, ids }) => {
  for (const id of ids) {
    await Commissions.findByIdAndUpdate(id, { address, zombieStatus: true })
  }

  return Commissions.find()
}

// get all zombies
export const apiGetZombies = async () => {
  try {
    return await Commissions.find({
      zombieStatus: true,
      $or: [{ zombieComplete: null }, { zombieComplete: false }],
    })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// complete zombies
export const apiCompleteZombies = async ({ ids }) => {
  try {
    await Commissions.updateMany(
      { _id: { $in: [...ids] } },
      { $set: { zombieComplete: true } },
      { multi: true }
    )

    return await Commissions.find()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
