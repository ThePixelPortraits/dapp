import { useContext } from 'react'

import { useForm } from 'react-hook-form'

import Button from 'components/ui/forms/button'
import FormInput from 'components/ui/forms/input'
import { AppContext } from 'context/AppContext'

import { ButtonGroup } from 'components/styled/page.styled'

const RegisterNames = () => {
  const { pixelsContract } = useContext(AppContext)
  const { register, handleSubmit } = useForm()

  const onSubmit = async values => {
    await pixelsContract.registerNames(values.registerNames.split(','))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <FormInput register={register} property="registerNames" withoutLabel />
      <ButtonGroup align="right">
        <Button>Submit</Button>
      </ButtonGroup>
    </form>
  )
}

export default RegisterNames
