import { useState, useContext, useEffect, lazy, Suspense } from 'react'

import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { parseEther } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { useForm } from 'react-hook-form'

import Loader from '../../../ui/widgets/loader'

import {
  createCommissionMutation,
  removeCommissionMutation,
} from 'api/mutations/commissions'
import {
  getPositionForPrice,
  getUserCommissions,
} from 'api/queries/commissions'
import InputDesired from 'components/commissions/actions/create/form/desired'
import InputImage from 'components/commissions/actions/create/form/image'
import InputNotes from 'components/commissions/actions/create/form/notes'
import InputPrice from 'components/commissions/actions/create/form/price'
import InputTwitter from 'components/commissions/actions/create/form/twitter'
import SidebarDetails from 'components/commissions/ui/sidebar-details'
import Button from 'components/ui/forms/button'
import FormInput from 'components/ui/forms/input'
import ValidationIcon from 'components/ui/forms/validation-icon'
import { AppContext } from 'context/AppContext'
import useMediaQuery from 'hooks/ui/useMediaQuery'

import {
  NameAndPrice,
  NameContainer,
  PriceContainer,
} from 'components/commissions/styled/create.styled'
import { Dashboard, Main, Sidebar } from 'components/styled/dashboard.styled'
import {
  ButtonGroup,
  Validation,
  FormLink,
} from 'components/styled/page.styled'
import { theme } from 'themes/default.styled'

const Submitting = lazy(() =>
  import('components/commissions/actions/create/submitting')
)
const Success = lazy(() =>
  import('components/commissions/actions/create/success')
)

const Create = ({ handleClose }) => {
  const { account } = useWeb3React()
  const { minBid, pixelsContract } = useContext(AppContext)
  const isTablet = useMediaQuery(theme.breakpoints.tabletDown)
  const [commissionId, setCommissionId] = useState('')
  const [showEmail, setShowEmail] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [thumbnail, setThumbnail] = useState('images/image-preview.png')
  const [formImage, setFormImage] = useState('')
  const [tx, setTx] = useState({})
  const [price, setPrice] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm()
  const [formError, setFormError] = useState('')
  const [addCommission] = useMutation(createCommissionMutation, {
    onCompleted: data => {
      setCommissionId(data.createCommission.id)
    },
    refetchQueries: [
      {
        query: getUserCommissions,
        variables: {
          address: account,
        },
      },
    ],
  })
  const [removeCommission] = useMutation(removeCommissionMutation, {
    variables: { id: commissionId },
  })
  const [getPosition, { loading, data }] = useLazyQuery(getPositionForPrice, {
    variables: { price: price?.toString() },
  })

  useEffect(() => {
    setPrice(minBid?.toString())
  }, [minBid])

  const onSubmit = async values => {
    setFormError('')
    setSubmitting(true)

    try {
      const priceFixed = parseFloat(values.price).toFixed(1)
      await addCommission({
        variables: {
          ...values,
          price: priceFixed,
          address: account,
          image: formImage,
        },
      })

      const txn = await pixelsContract.commission(values.desired, {
        value: parseEther(priceFixed.toString()),
      })

      setTx(txn)
      setSubmitting(false)
      setSubmitted(true)
    } catch (e) {
      const rejectedCommission = e.code === 4001

      if (rejectedCommission) {
        await removeCommission()
        setFormError('')
      } else {
        setFormError(e.message)
      }

      setSubmitting(false)
    }
  }

  return !submitted && !submitting ? (
    <Dashboard>
      <Main style={{ padding: '0 15px 0 10px' }}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <InputTwitter register={register} errors={errors} />
          {!showEmail && (
            <FormLink href="#" onClick={() => setShowEmail(true)}>
              don't have twitter?
            </FormLink>
          )}
          {showEmail && (
            <FormInput
              register={register}
              property="email"
              placeholder="optional!"
            />
          )}
          <NameAndPrice>
            <NameContainer>
              <InputDesired
                register={register}
                errors={errors}
                price={price}
                minBid={minBid}
                reset={reset}
              />
            </NameContainer>
            <PriceContainer>
              <InputPrice
                register={register}
                errors={errors}
                minBid={minBid?.toString()}
                onChange={e => {
                  setPrice(e.target.value)
                  getPosition()
                }}
              />
            </PriceContainer>
          </NameAndPrice>
          <InputNotes register={register} errors={errors} />
          <InputImage
            register={register}
            thumbnail={thumbnail}
            onChange={event => {
              const image = event.currentTarget.files[0]
              setFormImage(image)
              setThumbnail(URL.createObjectURL(image))
            }}
          />
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
      </Main>
      {!isTablet && (
        <Sidebar>
          <SidebarDetails
            price={price}
            loading={loading}
            getPosition={getPosition}
            position={data?.position}
          />
        </Sidebar>
      )}
    </Dashboard>
  ) : submitting ? (
    <Suspense fallback={<Loader />}>
      <Submitting name={getValues('desired')} price={getValues('price')} />
    </Suspense>
  ) : (
    <Suspense fallback={<Loader />}>
      <Success
        setSubmitted={setSubmitted}
        tx={tx}
        setTx={setTx}
        handleClose={handleClose}
      />
    </Suspense>
  )
}

export default Create
