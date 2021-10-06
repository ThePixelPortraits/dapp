import { test, describe } from '@jest/globals'

import { rules } from './validation'

describe('checkBalance', () => {
  test('it returns true if the users balance is more than the commission value', async () => {
    const checkBalance = await rules.checkBalance(0.01, 0.1)
    expect(checkBalance).toBe(true)
  })

  test('it returns false if the users balance is less than the commission value', async () => {
    const checkBalance = await rules.checkBalance(0.1, 0.01)
    expect(checkBalance).toBe('insufficient ETH balance!')
  })
})

describe('checkMinBid', () => {
  test('it returns true if the users bid is more than the minimum bid value', async () => {
    const checkMinBid = await rules.checkMinBid(0.2, 0.1)
    expect(checkMinBid).toBe(true)
  })

  test('it returns false if the users bid is less than the minimum bid value', async () => {
    const checkMinBid = await rules.checkMinBid(0.1, 0.2)
    expect(checkMinBid).toBe('bid must not be less than the minimum bid!')
  })
})

describe('checkName', () => {
  test('it returns true if the desired name is available', async () => {
    const checkName = await rules.checkName(false, false, 0.05, 0.1)
    expect(checkName).toBe(true)
  })

  test('it returns false if the desired name is not available', async () => {
    const checkName = await rules.checkName(true)
    expect(checkName).toBe(
      'sorry, a commission with that name has already been completed!'
    )
  })

  test('it returns false if the desired name has a higher bid', async () => {
    const checkName = await rules.checkName(true, true, 0.1, 0.05)
    expect(checkName).toBe(
      'sorry, that name already has a higher/equal bid of 0.1!'
    )
  })
})

describe('checkPriceIncrease', () => {
  test('it returns true if the price has been increased', async () => {
    const checkName = await rules.checkPriceIncrease(0.11, 0.1)
    expect(checkName).toBe(true)
  })

  test('it returns false if the price has not been increased', async () => {
    const checkName = await rules.checkPriceIncrease(0.1, 0.1)
    expect(checkName).toBe('price has not been increased!')
  })
})
