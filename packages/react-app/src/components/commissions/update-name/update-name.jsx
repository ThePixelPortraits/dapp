import { useState, useContext, useEffect } from 'react'

import { useQuery } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'

import { getCommission } from 'api/queries/commissions'
import InputDesired from 'components/commissions/actions/create/form/desired'
import Submitting from 'components/commissions/update-name/submitting'
import Success from 'components/commissions/update-name/success'
import Button from 'components/ui/forms/button'
import ValidationIcon from 'components/ui/forms/validation-icon'
import Loader from 'components/ui/widgets/loader'
import { AppContext } from 'context/AppContext'

import { ButtonGroup, Validation } from 'components/styled/page.styled'

const UpdateName = ({ commissionId, handleClose }) => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [tx, setTx] = useState(false)
  const [formError, setFormError] = useState('')
  const { pixelsContract } = useContext(AppContext)
  const { loading, error, data } = useQuery(getCommission, {
    variables: { id: commissionId },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      desired: data?.commission.desired,
    },
  })

  useEffect(() => {
    reset({ desired: data?.commission.desired })
  }, [data])

  if (loading || error) return <Loader />

  const onSubmit = async ({ desired }) => {
    try {
      setSubmitting(true)

      const newTx = await pixelsContract.updateCommissionName(
        data.commission.onChainId,
        desired
      )

      setTx(newTx)
      setSubmitting(false)
      setSubmitted(true)
    } catch (e) {
      setSubmitting(false)
      setFormError(e.message)
    }
  }

  return !submitted && !submitting ? (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputDesired register={register} errors={errors} setName={() => {}} />
      {formError && (
        <Validation>
          <ValidationIcon />
          {formError}
        </Validation>
      )}
      <ButtonGroup align="right">
        <Button>Submit</Button>
      </ButtonGroup>
    </form>
  ) : submitting ? (
    <Submitting name={getValues('desired')} />
  ) : (
    <Success handleClose={handleClose} tx={tx} setSubmitted={setSubmitted} />
  )
}

export default UpdateName
