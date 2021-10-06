import { useState, useEffect } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'

import { buildZombies, zombieAllocation } from '../components/helpers/zombies'

import { registerZombiesMutation } from 'api/mutations/members'
import { getMemberCommissions } from 'api/queries/members'
import MemberCommission from 'components/members/member-commission'
import Loader from 'components/ui/widgets/loader'

import { PageTitle } from 'components/styled/App.styled'
import {
  Description,
  ZombieButton,
  ZombiesContainer,
} from 'views/styled/zombies.styled'

const Zombies = () => {
  const { account } = useWeb3React()
  const [zombies, setZombies] = useState([])
  const [selected, setSelected] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [allowance, setAllowance] = useState(0)
  const [allowanceTaken, setAllowanceTaken] = useState(false)
  const { loading, error, data } = useQuery(getMemberCommissions, {
    variables: { address: account },
    skip: !account,
  })
  const [registerZombies] = useMutation(registerZombiesMutation)

  const getAllocation = async () => {
    const { calculatedAllowance, existingZombie } = await zombieAllocation(
      data?.membersCommissions
    )

    if (selected === 0) setSelected(existingZombie)
    setAllowance(calculatedAllowance)
  }

  const getExistingZombies = async () => {
    let existing = 0

    await data?.membersCommissions.forEach(zombie => {
      if (zombie.zombie) {
        existing++
      }
    })

    setAllowanceTaken(existing === allowance)
  }

  useEffect(async () => {
    await getAllocation()
    await getExistingZombies()
  }, [getAllocation, getExistingZombies, data, allowance, allowanceTaken])

  if (!account || loading || error || submitting) {
    return <Loader />
  }

  const handleClick = async (commissionId, zombie) => {
    if (!zombie) {
      await setZombies(
        buildZombies(zombies, commissionId, selected, setSelected)
      )
    }
  }

  const submitZombies = async () => {
    setSubmitting(true)
    await registerZombies({
      variables: { address: account.toLowerCase(), ids: zombies },
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  return !submitted ? (
    data?.membersCommissions.length ? (
      <>
        <PageTitle>
          zombies ({selected}/{allowance})
        </PageTitle>
        <Description>
          <p>
            {allowanceTaken ? (
              <>thanks for selecting all of your zombies!</>
            ) : (
              <>
                click on your portraits to select the ones that you'd like to
                turn into zombies!
              </>
            )}
          </p>
          {allowance >= selected && !allowanceTaken && (
            <ZombieButton onClick={submitZombies}>zombify!</ZombieButton>
          )}
        </Description>
        <ZombiesContainer>
          {data?.membersCommissions.map(portrait => (
            <MemberCommission
              stopSelection={allowance === selected}
              key={portrait.name}
              commission={portrait}
              handleClick={handleClick}
            />
          ))}
        </ZombiesContainer>
      </>
    ) : (
      <>you ain't part of the pixelfam, son!</>
    )
  ) : (
    <>
      <p>thanks! your zombie request has been sent!</p>
      <ZombieButton onClick={() => window.location.reload(true)}>
        back to zombies
      </ZombieButton>
    </>
  )
}

export default Zombies
