export const buildZombies = (zombies, commissionId, selected, setSelected) => {
  let newZombies = zombies

  if (newZombies.includes(commissionId)) {
    newZombies = newZombies.filter(item => {
      return item !== commissionId
    })
    setSelected(selected !== 0 ? selected - 1 : 0)
  } else {
    newZombies.push(commissionId)
    setSelected(selected + 1)
  }

  return newZombies
}

export const zombieAllocation = async data => {
  let calculatedAllowance = 0
  let existingZombie = 0
  const presaleStack = data?.filter(portrait => portrait.presale) || []
  const normalStack = data?.filter(portrait => !portrait.presale) || []

  calculatedAllowance += presaleStack.length > 0 ? 2 : 1

  await presaleStack.forEach((portrait, index) => {
    if (index > 0 && index % 4 === 0) {
      calculatedAllowance += 2
    }
    if (portrait.zombie) {
      existingZombie++
    }
  })

  await normalStack.forEach((portrait, index) => {
    if (index > 0 && index % 4 === 0) {
      calculatedAllowance += 1
    }
    if (portrait.zombie) {
      existingZombie++
    }
  })

  return { calculatedAllowance, existingZombie }
}
