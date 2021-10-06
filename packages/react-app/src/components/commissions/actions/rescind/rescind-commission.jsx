import { useState, useContext, lazy, Suspense } from 'react'

import { useQuery } from '@apollo/react-hooks'

import { getCommission } from 'api/queries/commissions'
import Button from 'components/ui/forms/button'
import ValidationIcon from 'components/ui/forms/validation-icon'
import Loader from 'components/ui/widgets/loader'
import { AppContext } from 'context/AppContext'

import { Flex } from 'components/styled/flex.styled'
import { Validation } from 'components/styled/page.styled'
import { theme } from 'themes/default.styled'

const Submitting = lazy(() =>
  import('components/commissions/actions/rescind/submitting')
)
const Success = lazy(() =>
  import('components/commissions/actions/rescind/success')
)

const RescindCommission = ({ commissionId, handleClose }) => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [tx, setTx] = useState(false)
  const [formError, setFormError] = useState('')

  const { pixelsContract } = useContext(AppContext)
  const { loading, error, data } = useQuery(getCommission, {
    variables: { id: commissionId },
  })

  if (loading || error) return <Loader />

  return !submitted && !submitting ? (
    <Flex style={{ flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ textAlign: 'center', padding: '20px 0' }}>
        we're sorry to see you go!
        <br />
        <br />
        if you're sure then please confirm and your bid will be returned
      </p>
      {formError && (
        <Validation>
          <ValidationIcon />
          {formError}
        </Validation>
      )}
      <Button
        background={theme.colors.red}
        borderColor="#c45e6b"
        onClick={async () => {
          setFormError('')
          try {
            setSubmitting(true)

            const newTx = await pixelsContract.rescindCommission(
              data.commission.onChainId
            )

            setSubmitting(false)
            setTx(newTx)
            setSubmitted(true)
          } catch (e) {
            setSubmitting(false)
            setFormError(e.message)
          }
        }}
      >
        Confirm Cancellation
      </Button>
    </Flex>
  ) : submitting ? (
    <Suspense fallback={<Loader />}>
      <Submitting />
    </Suspense>
  ) : (
    <Suspense fallback={<Loader />}>
      <Success
        setFormError={setFormError}
        handleClose={handleClose}
        tx={tx}
        setSubmitted={setSubmitted}
      />
    </Suspense>
  )
}

export default RescindCommission
