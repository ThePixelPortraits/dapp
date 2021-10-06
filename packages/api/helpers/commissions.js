import { Commissions } from '../models/Commissions'

export const updateIfBeaten = async (desired, address, price) => {
  // check for existing commission with the same name but not address
  const beatenCommission = await Commissions.findOne({
    desired,
    address: { $ne: address.toLowerCase() },
  })

  if (beatenCommission) {
    await Commissions.findByIdAndUpdate(beatenCommission.id, {
      status: 'beaten',
      beatenBy: address.toLowerCase(),
      beatenByPrice: parseFloat(price),
    })
  }
}
