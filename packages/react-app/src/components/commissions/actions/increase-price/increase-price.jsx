import { useState, useContext, useEffect, lazy, Suspense } from 'react'

import { useMutation, useQuery } from '@apollo/react-hooks'
import { parseEther } from '@ethersproject/units'
import { useForm } from 'react-hook-form'

import { updateCommissionBid } from 'api/mutations/commissions'
import {
  getCommission,
  getPositionForPrice,
  getMinPriceForName,
} from 'api/queries/commissions'
import InputPrice from 'components/commissions/actions/create/form/price'
import { rules } from 'components/helpers/validation'
import Button from 'components/ui/forms/button'
import ValidationIcon from 'components/ui/forms/validation-icon'
import Loader from 'components/ui/widgets/loader'
import { AppContext } from 'context/AppContext'

import { ButtonGroup, Validation } from 'components/styled/page.styled'

const Submitting = lazy(() =>
  import('components/commissions/actions/increase-price/submitting')
)
const Success = lazy(() =>
  import('components/commissions/actions/increase-price/success')
)

const IncreasePrice = ({ commissionId, handleClose }) => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [tx, setTx] = useState(false)
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [difference, setDifference] = useState(0)
  const [etherDifference, setEtherDifference] = useState(0)

  const [formError, setFormError] = useState('')

  const { balance, pixelsContract } = useContext(AppContext)
  const { loading, error, data } = useQuery(getCommission, {
    variables: { id: commissionId },
  })
  const { data: dataPosition } = useQuery(getPositionForPrice, {
    variables: { price: price.toString() },
  })
  const { data: dataName } = useQuery(getMinPriceForName, {
    variables: { name },
  })
  const [updateBid] = useMutation(updateCommissionBid)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      price: data?.commission.price,
    },
  })

  if (data && price === 0) {
    setPrice(data?.commission?.price)
    setName(data?.commission?.desired)
  }
  const commissionPrice = data?.commission?.price || 0
  const { checkPriceIncrease } = rules

  const minPriceForName = dataName?.minPrice.price || 0

  useEffect(() => {
    reset({ price: data?.commission.price })
  }, [data])

  if (loading || error) return <Loader />

  const position = dataPosition?.position || 'x'

  const onSubmit = async () => {
    setSubmitting(true)
    const validationFailed = false

    if (!validationFailed) {
      setFormError('')
      try {
        const newTx = await pixelsContract.increaseCommissionBid(
          data.commission.onChainId,
          {
            value: etherDifference,
          }
        )
        await updateBid({ variables: { commission: data.commission } })

        setTx(newTx)
        setSubmitting(false)
        setSubmitted(true)
      } catch (e) {
        setSubmitting(false)
        setFormError(e.message)
      }
    }
  }

  return !submitted && !submitting ? (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputPrice
        register={register}
        registerOptions={{
          price: v => checkPriceIncrease(v, data?.commission?.price),
        }}
        errors={errors}
        balance={balance}
        minBid={minPriceForName}
        onChange={e => {
          const priceFixed = parseFloat(e.target.value).toFixed(1)
          setPrice(priceFixed || 0)
          setDifference(priceFixed - commissionPrice)
          setEtherDifference(
            parseEther(priceFixed).sub(parseEther(commissionPrice))
          )
        }}
      />
      <p>
        you will deposit another
        <b>&nbsp;{parseFloat(difference).toFixed(1)}ETH</b>, which will put you
        in position #{position} in the queue
      </p>

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
    <Suspense fallback={<Loader />}>
      <Submitting price={getValues('price')} />
    </Suspense>
  ) : (
    <Suspense fallback={<Loader />}>
      <Success
        setSubmitted={setSubmitted}
        tx={tx}
        handleClose={handleClose}
        setFormError={setFormError}
        setPrice={setPrice}
      />
    </Suspense>
  )
}

export default IncreasePrice
