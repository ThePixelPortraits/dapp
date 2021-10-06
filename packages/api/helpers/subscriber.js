import sgMail from '@sendgrid/mail'

import { Commissions } from '../models/Commissions'
import { Config } from '../models/Config'

import { emailMessage, logError, logger } from './index'

const ethers = require('ethers')

export const registerName = async (names, name, blockNumber) => {
  const newCommission = new Commissions({
    name,
    desired: name,
    address: '0x0',
    onChainId:
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    price: '0.01',
    status: 'completed',
    twitter: 'no tweeter',
    notes: 'no notes',
    lastBlockNumber: blockNumber,
  })
  await newCommission.save()
  logger('admin has registered the names', names)
}

export const newCommission = async (
  name,
  recipient,
  commissionIndex,
  bid,
  blockNumber
) => {
  let finalCommission
  const price = ethers.utils.formatEther(bid)
  const status = 'queued'
  const onChainId = commissionIndex.toNumber()
  const commission = await Commissions.findOne({
    desired: name,
    address: recipient.toLowerCase(),
    $or: [{ status: 'pending' }, { status: 'queued' }],
  })
  logger('new commission created in block', blockNumber)

  if (commission) {
    await Commissions.findByIdAndUpdate(commission.id, {
      onChainId,
      price,
      status,
      lastBlockNumber: blockNumber,
    })
    finalCommission = await Commissions.findById(commission.id)
    logger('updated commission', finalCommission)
  } else {
    finalCommission = await new Commissions({
      onChainId,
      price,
      status,
      desired: name,
      address: recipient.toLowerCase(),
      twitter: 'no tweeter',
      notes: 'no notes',
      lastBlockNumber: blockNumber,
    })
    await finalCommission.save()
    logger('commission not found, creating commission', finalCommission)
  }

  sgMail
    .send(emailMessage('NewCommission', finalCommission))
    .then(() => {
      logger('email sent: new commission', `${name} | ${price}`)
    })
    .catch(error => {
      logError(error, 'error sending email')
    })
}

export const updateCommissionName = async (
  commissionIndex,
  newName,
  blockNumber
) => {
  const commission = await Commissions.findOne({
    onChainId: commissionIndex.toNumber(),
  })
  if (commission) {
    await Commissions.findByIdAndUpdate(commission.id, {
      desired: newName,
      lastBlockNumber: blockNumber,
    })
    logger('updated commission name', commission)

    sgMail
      .send(emailMessage('CommissionNameUpdated', commission, { newName }))
      .then(() => {
        logger('email sent: name updated', `${commission.desired} | ${newName}`)
      })
      .catch(error => {
        logError(error, 'error sending email')
      })
  } else {
    logError(`No commission with index`, commissionIndex.toNumber())
  }
}

export const rescindCommission = async (commissionIndex, blockNumber) => {
  const commission = await Commissions.findOne({
    onChainId: commissionIndex.toNumber(),
  })
  if (commission) {
    await Commissions.findByIdAndUpdate(commission.id, {
      status: 'rescinded',
      lastBlockNumber: blockNumber,
    })
    logger('commission rescinded', commission)

    sgMail
      .send(emailMessage('CommissionRescinded', commission))
      .then(() => {
        logger('email sent: rescinded', `${commission.desired}`)
      })
      .catch(error => {
        logError(error, 'error sending email')
      })
  } else {
    logError(`No commission with index`, commissionIndex.toNumber())
  }
}

export const updateCommissionBid = async (
  commissionIndex,
  newBid,
  blockNumber
) => {
  const newBidConverted = ethers.utils.formatEther(newBid)
  const commission = await Commissions.findOne({
    onChainId: commissionIndex.toNumber(),
  })
  if (commission) {
    await Commissions.findByIdAndUpdate(commission.id, {
      price: newBidConverted,
      lastBlockNumber: blockNumber,
    })
    logger('updated bid on commission', commission)

    sgMail
      .send(
        emailMessage('CommissionBidUpdated', commission, { newBidConverted })
      )
      .then(() => {
        logger(
          'email sent: bid updated',
          `${commission.desired} | ${newBidConverted}`
        )
      })
      .catch(error => {
        logError(error, 'error sending email')
      })
  } else {
    logError(`No commission with index`, commissionIndex.toNumber())
  }
}

export const acceptCommission = async (commissionIndex, blockNumber) => {
  const commission = await Commissions.findOne({
    onChainId: commissionIndex.toNumber(),
  })
  if (commission) {
    await Commissions.findByIdAndUpdate(commission.id, {
      status: 'accepted',
      lastBlockNumber: blockNumber,
    })
    logger('accepted commission', commission)
  } else {
    logError(`No commission with index`, commissionIndex.toNumber())
  }
}

export const updateMinBid = async (newMinBid, blockNumber) => {
  await Config.update(
    {},
    {
      minBid: ethers.utils.formatEther(newMinBid),
      lastBlockNumber: blockNumber,
    },
    { multi: true }
  )
  logger('updated min bid', newMinBid)
}

export const updateAdminAddress = async (newAdmin, blockNumber) => {
  await Config.update(
    {},
    {
      adminAddress: newAdmin.toLowerCase(),
      lastBlockNumber: blockNumber,
    },
    { multi: true }
  )
  logger('admin address updated to', newAdmin)
}
