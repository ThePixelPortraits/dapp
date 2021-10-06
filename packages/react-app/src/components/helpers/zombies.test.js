import { describe, test } from '@jest/globals'

import { zombieAllocation } from 'components/helpers/zombies'
import {
  data6Zombies,
  data3Zombies,
  data2Zombies,
  data2ZombiesPresale,
  data1Zombie,
} from 'mocks/zombies'

describe('zombieAllocation', () => {
  test('it returns 6 zombies as the allowance', async () => {
    const { calculatedAllowance } = await zombieAllocation(data6Zombies)
    expect(calculatedAllowance).toBe(6)
  })

  test('it returns 3 zombies as the allowance', async () => {
    const { calculatedAllowance } = await zombieAllocation(data3Zombies)
    expect(calculatedAllowance).toBe(3)
  })

  test('it returns 2 zombies as the allowance', async () => {
    const { calculatedAllowance } = await zombieAllocation(data2Zombies)
    expect(calculatedAllowance).toBe(2)
  })

  test('it returns 2 zombies as the allowance', async () => {
    const { calculatedAllowance } = await zombieAllocation(data2ZombiesPresale)
    expect(calculatedAllowance).toBe(2)
  })

  test('it returns 1 zombie as the allowance', async () => {
    const { calculatedAllowance } = await zombieAllocation(data1Zombie)
    expect(calculatedAllowance).toBe(1)
  })
})
