import { useQuery } from '@apollo/react-hooks'
import { useForm } from 'react-hook-form'

import Button from '../../ui/forms/button'
import FormInput from '../../ui/forms/input'

import { getCommission } from 'api/queries/commissions'
import Loader from 'components/ui/widgets/loader'
import Tag from 'components/ui/widgets/tag'

import { ButtonGroup } from '../../styled/page.styled'
import { CommissionField } from 'components/admin/styled/admin.styled'
import { Flex } from 'components/styled/flex.styled'

const ShowCommission = ({ commisionId, showAltNames }) => {
  const { loading, error, data } = useQuery(getCommission, {
    variables: { id: commisionId },
  })
  const { register, handleSubmit } = useForm({
    defaultValues: {
      price: data?.commission.altNames,
    },
  })

  if (loading || error) return <Loader />

  const {
    price,
    desired,
    onChainId,
    beatenBy,
    createdAt,
    beatenByPrice,
    position,
    status,
    twitter,
    notes,
    address,
    image,
  } = data?.commission

  const dateObj = new Date(parseInt(createdAt))

  const onSubmit = async values => {
    try {
      // add alt names here
      console.log(values)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Flex>
      <div style={{ width: '75%', paddingRight: '16px' }}>
        <CommissionField>
          <span>twitter:</span> {twitter}
        </CommissionField>
        <CommissionField>
          <span>address:</span> {address}
        </CommissionField>
        <CommissionField>{notes}</CommissionField>
        <CommissionField>
          {image && <img alt={desired} src={image} width={200} />}
        </CommissionField>
        {showAltNames && (
          <CommissionField
            style={{ borderTop: '1px solid #e9e9e9', paddingTop: '15px' }}
          >
            <span>add alt names for this commission name:</span>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <FormInput register={register} property="altNames" withoutLabel />
              <ButtonGroup align="right">
                <Button>Submit</Button>
              </ButtonGroup>
            </form>
          </CommissionField>
        )}
      </div>
      <div style={{ width: '25%' }}>
        <CommissionField>
          <span>name:</span> {desired}
        </CommissionField>
        <CommissionField>
          <span>bid:</span> {price}
        </CommissionField>
        <CommissionField>
          <span>created:</span> {dateObj.toLocaleDateString('en-US')}
        </CommissionField>
        <CommissionField>
          <span>chainId:</span> {onChainId}
        </CommissionField>
        <CommissionField>
          <span>status:</span>
          <Tag>{status}</Tag>
        </CommissionField>
        <CommissionField>
          <span>position:</span> {position}
        </CommissionField>
      </div>
      <div>
        {beatenBy}
        <br />
        {beatenByPrice}
      </div>
    </Flex>
  )
}

export default ShowCommission
