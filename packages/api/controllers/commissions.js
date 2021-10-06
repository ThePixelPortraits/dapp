import AWS from 'aws-sdk'
import chalk from 'chalk'
import fetch from 'node-fetch'
import { UserInputError } from 'apollo-server-express'

import { Commissions } from '../models/Commissions.js'
import { updateIfBeaten } from '../helpers/commissions'

const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

// get all commissions
export const apiGetCommissions = async () => {
  try {
    return await Commissions.find()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get all commissions count
export const apiGetCommissionsCount = async () => {
  try {
    return await Commissions.count({
      status: {
        $in: ['accepted', 'completed'],
      },
    })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get single commission
export const apiGetCommission = async ({ id }) => {
  try {
    return await Commissions.findById(id)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// remove single commission
export const apiRemoveCommission = async ({ id }) => {
  try {
    return await Commissions.findByIdAndDelete(id)
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get all accepted commissions
export const apiGetAcceptedCommissions = async () => {
  try {
    return await Commissions.find({ status: 'accepted' })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get all beaten commissions
export const apiGetBeatenCommissions = async () => {
  try {
    return await Commissions.find({ status: 'beaten' })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get all pending commissions
export const apiGetPendingCommissions = async () => {
  try {
    return await Commissions.find({ status: 'pending' })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get all unaccepted commissions
export const apiGetUnacceptedCommissions = async () => {
  try {
    return await Commissions.find({
      $or: [{ status: 'queued' }],
    }).sort({ position: 1 })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get commissions by user
export const apiGetUserCommissions = async ({ address }) => {
  try {
    return await Commissions.find({
      address,
      $and: [{ status: { $ne: 'inactive' } }, { status: { $ne: 'completed' } }],
    })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get single commission
export const apiGetNameCommissions = async ({ name }) => {
  try {
    return await Commissions.find({ desired: name }).sort({
      price: -1,
      updatedAt: 1,
    })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get top commission
export const apiGetTopCommission = async () => {
  try {
    return (await Commissions.findOne({ status: 'queued', position: '1' }))
      .price
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get position
export const apiGetPositionForPrice = async ({ price }) => {
  try {
    const commissions = await Commissions.find({
      status: 'queued',
      price: { $gte: price },
    }).sort({ position: -1 })

    return commissions.length === 0 ? 1 : commissions[0].position + 1
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// get min price for name
export const apiGetMinPriceForName = async ({ name }) => {
  try {
    const completed = await Commissions.findOne({
      desiredSlug: name.toLowerCase().replace(/ /g, ''),
      status: {
        $in: ['accepted', 'completed'],
      },
    })
    if (completed) {
      return {
        taken: true,
        beatable: false,
      }
    }
    const queued = await Commissions.find({
      desiredSlug: name.toLowerCase().replace(/ /g, ''),
      status: 'queued',
    }).sort({ position: 1 })
    if (queued && queued[0]) {
      return {
        taken: true,
        beatable: true,
        price: queued[0].price,
      }
    }
    return { taken: false }
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
// get commissions by user that are completed
export const apiGetUserCompletedCommissions = async ({ address }) => {
  try {
    const userCollection = await fetch(
      `https://api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=50&owner=${address}&collection=the-pixel-portraits-og`
    )
    return await userCollection.json()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// create commission
export const apiCreateCommission = async commission => {
  const { price, email, desired, address, twitter, notes, image } = commission
  const imageFile = await image
  let result

  if (image) {
    try {
      const { createReadStream, filename } = await imageFile.file
      const fileStream = await createReadStream()
      const uploadParams = {
        Bucket: 'S3_BUCKET_NAME',
        Key: filename,
        Body: fileStream,
      }
      result = await s3.upload(uploadParams).promise()
    } catch (e) {
      console.log(chalk.red(`error uploading image: ${e}`))
    }
  }

  try {
    await updateIfBeaten(desired, address, price)

    // check for existing commission with the same name and same address
    const existingCommission = await Commissions.findOne({
      desired,
      address: address.toLowerCase(),
    })

    if (existingCommission) {
      throw new UserInputError(
        `a commission with this name and address already exists!`
      )
    }

    const Commission = new Commissions({
      price: parseFloat(price),
      desired,
      desiredSlug: desired.toLowerCase().replace(/ /g, ''),
      email,
      address: address.toLowerCase(),
      status: 'pending',
      twitter,
      notes,
      image: result ? result.Location : null,
    })
    await Commission.save()

    return await Commission
  } catch (err) {
    console.log(`Error: ${err}`)
    throw new Error(`Error: ${err}`)
  }
}

// update commission
export const apiUpdateCommission = async commission => {
  try {
    await Commissions.findByIdAndUpdate(commission.id, { ...commission })
    return await Commissions.find()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// update commission bid
export const apiUpdateCommissionBid = async ({ commission }) => {
  const { id, desired, address, price } = commission

  try {
    await updateIfBeaten(desired, address, price)

    await Commissions.findByIdAndUpdate(id, {
      price,
      status: 'queued',
      beatenBy: '',
      beatenByPrice: 0,
    })

    return await Commissions.find()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// update alt names
export const apiUpdateCommissionAltNames = async ({ id, altNames }) => {
  try {
    await Commissions.findByIdAndUpdate(id, {
      altNames,
    })

    return await Commissions.find()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// update commission queue
export const apiUpdateCommissionQueue = async ({ ids }) => {
  try {
    await Commissions.updateMany(
      { _id: { $in: [...ids] } },
      { $set: { status: 'accepted' } },
      { multi: true }
    )

    return await Commissions.find({ status: 'accepted' })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// update commission queue
export const apiCompletedCommissions = async ({ ids }) => {
  try {
    await Commissions.updateMany(
      { _id: { $in: [...ids] } },
      { $set: { status: 'completed' } },
      { multi: true }
    )

    return await Commissions.find({ status: 'completed' })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// update flagged commissions
export const apiFlagCommissions = async ({ ids, flagged }) => {
  try {
    await Commissions.updateMany(
      { _id: { $in: [...ids] } },
      { $set: { flagged } },
      { multi: true }
    )

    return await Commissions.find({ flagged: true })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}

// update inactive commissions
export const apiUpdateInactiveCommissions = async ({ ids }) => {
  try {
    await Commissions.updateMany(
      { _id: { $in: [...ids] } },
      { $set: { status: 'inactive' } },
      { multi: true }
    )

    return await Commissions.find({ flagged: true })
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
