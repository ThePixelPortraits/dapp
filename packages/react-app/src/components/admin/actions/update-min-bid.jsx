import { useContext, useState } from 'react'

import { parseEther } from '@ethersproject/units'
import { useForm } from 'react-hook-form'

import Button from 'components/ui/forms/button'
import FormInput from 'components/ui/forms/input'
import { AppContext } from 'context/AppContext'

import { ButtonGroup } from 'components/styled/page.styled'

const UpdateMinBid = () => {
  const { minBid, pixelsContract } = useContext(AppContext)
  const [newMinBid, setNewMinBid] = useState(minBid)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      minBid,
    },
  })

  const onSubmit = async () => {
    await pixelsContract.updateMinBid(parseEther(newMinBid.toString()))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <FormInput
        register={register}
        property="minBid"
        withoutLabel
        defaultValue={minBid}
        onChange={e => {
          setNewMinBid(e.target.value)
        }}
      />
      <ButtonGroup align="right">
        <Button>Submit</Button>
      </ButtonGroup>
    </form>
  )
}

export default UpdateMinBid
