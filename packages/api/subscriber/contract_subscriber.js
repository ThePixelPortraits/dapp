import sgMail from '@sendgrid/mail'
import chalk from 'chalk'
import delay from 'delay'

import {
  PIXELS_ABI,
  PIXELS_ADDRESS,
  PIXELS_BLOCK,
  PROVIDER,
} from '../constants'
import { logError, logger } from '../helpers'
import {
  newCommission,
  registerName,
  rescindCommission,
  updateCommissionBid,
  updateCommissionName,
  acceptCommission,
  updateMinBid,
  updateAdminAddress,
} from '../helpers/subscriber'
import { Commissions } from '../models/Commissions.js'
import { Config } from '../models/Config.js'
import { getSecrets } from '../utils/aws'

setTimeout(async () => {
  const secrets = await getSecrets()
  sgMail.setApiKey(secrets.SENDGRID_API_KEY)
}, 1)

const ethers = require('ethers')

const pixelsContract = new ethers.Contract(PIXELS_ADDRESS, PIXELS_ABI, PROVIDER)

let queueAltered = false

export default async function subscriber() {
  console.log(chalk.yellow('----- Contract Subscriber Initialized ----- '))

  const configBlock = (await Config.find())[0].currentBlock
  logger('found current block', configBlock)

  let currentStoredBlock = configBlock || PIXELS_BLOCK
  while (true) {
    try {
      const latestBlock = await PROVIDER.getBlockNumber()
      await delay(30000)

      logger('current block', currentStoredBlock)
      logger('latest block', latestBlock)

      let fromBlock = currentStoredBlock + 1

      while (fromBlock <= latestBlock) {
        let events
        if (latestBlock < fromBlock + 10000) {
          logger(
            'about to get events for range',
            `${fromBlock} => ${latestBlock}`
          )
          events = await pixelsContract.queryFilter(
            pixelsContract.filters,
            fromBlock,
            latestBlock
          )
          fromBlock = latestBlock + 1
        } else {
          logger(
            'about to get events for range',
            `${fromBlock} => ${fromBlock + 10000}`
          )
          events = await pixelsContract.queryFilter(
            pixelsContract.filters,
            fromBlock,
            fromBlock + 10000
          )
          fromBlock += 10001
        }
        await processEvents(events)

        if (queueAltered) {
          updateQueue()
        }
      }

      currentStoredBlock = latestBlock
      await Config.update(
        {},
        { currentBlock: currentStoredBlock },
        { multi: true }
      )

      await delay(10000)
    } catch (error) {
      logError(error)
    }
  }
}

async function processEvents(events) {
  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const {
      args: {
        _names,
        _name,
        _bid,
        _recipient,
        _commissionIndex,
        _newName,
        _newBid,
        _newMinBid,
        _newAdmin,
      },
      blockNumber,
    } = event

    switch (event.event) {
      // =================================== REGISTER NAMES
      case 'NamesRegistered':
        await _names.map(async name => {
          await registerName(_names, name, blockNumber)
        })
        queueAltered = true
        break
      // =================================== NEW COMMISSION
      case 'NewCommission':
        await newCommission(
          _name,
          _recipient,
          _commissionIndex,
          _bid,
          event.blockNumber
        )

        queueAltered = true
        break
      // =================================== UPDATE NAME
      case 'CommissionNameUpdated':
        await updateCommissionName(_commissionIndex, _newName, blockNumber)

        queueAltered = true
        break
      // =================================== COMMISSION RESCINDED
      case 'CommissionRescinded':
        await rescindCommission(_commissionIndex, blockNumber)
        queueAltered = true
        break
      // =================================== BID UPDATED
      case 'CommissionBidUpdated':
        await updateCommissionBid(_commissionIndex, _newBid, blockNumber)

        queueAltered = true
        break
      // =================================== COMMISSION PROCESSED
      case 'CommissionProcessed':
        await acceptCommission(_commissionIndex, blockNumber)
        queueAltered = true
        break
      // =================================== MIN BID UPDATED
      case 'MinBidUpdated':
        await updateMinBid(_newMinBid, blockNumber)
        break
      // =================================== ADMIN ADDRESS UPDATED
      case 'AdminUpdated':
        await updateAdminAddress(_newAdmin, blockNumber)
        break
      default:
        return
    }
  }
}

async function updateQueue() {
  const sortedCommissions = await Commissions.find({
    status: { $in: ['queued', 'beaten'] },
  }).sort({
    price: -1,
    lastBlockNumber: 1,
  })
  // TODO: we need to sort also by longest time since changed so that earlier bidders at a given price are still the winners
  let position = 1
  const winners = {}
  const accepted = await Commissions.find({
    $or: [{ status: 'accepted' }, { status: 'completed' }],
  })

  await accepted.forEach(async commission => {
    winners[commission.desired.toLowerCase()] = commission.onChainId
  })

  await sortedCommissions.forEach(async commission => {
    const updated = {}
    if (winners[commission.desired.toLowerCase()]) {
      const winner = await Commissions.findOne({
        onChainId: winners[commission.desired.toLowerCase()],
      })
      updated.beatenBy = winner.onChainId
      updated.beatenByPrice = winner.price
      updated.status = 'beaten'
    } else {
      updated.position = position
      position++
      winners[commission.desired.toLowerCase()] = commission.onChainId
      updated.beatenBy = 0
      updated.beatenByPrice = 0
      updated.status = 'queued'
    }
    await Commissions.findByIdAndUpdate(commission._id, { $set: updated })
  })
  queueAltered = false
}
