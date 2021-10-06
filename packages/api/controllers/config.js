import { Config } from '../models/Config.js'
import { getSecrets } from '../utils/aws'

// get configs
export const apiGetConfigs = async () => {
  try {
    return await Config.find()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// update minimum bid
export const apiUpdateMinBid = async ({ minBid }) => {
  try {
    await Config.update({}, { minBid }, { multi: true })
    return await Config.find()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

export const apiGetAdmin = async ({ address }) => {
  const { ADMINS } = await getSecrets()
  return ADMINS.split(',').includes(address.toLowerCase())
}

// DANGER
// update admin address
// export const apiUpdateAdminAddress = async ({ adminAddress }) => {
//   try {
//     return await Config.updateOne({}, { adminAddress })
//   } catch (err) {
//     throw new Error(`Error: ${err}`)
//   }
// }
