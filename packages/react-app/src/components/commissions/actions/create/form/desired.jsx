import { useLazyQuery } from '@apollo/react-hooks'

import { getMinPriceForName } from 'api/queries/commissions'
import { rules } from 'components/helpers/validation'
import FormInput from 'components/ui/forms/input'

const InputDesired = ({ register, errors, price, minBid }) => {
  const [getCheckName, { data }] = useLazyQuery(getMinPriceForName)
  const { lettersNumbers, checkName } = rules

  return (
    <FormInput
      register={register}
      registerOptions={{
        required: 'Please enter your desired portrait name',
        validate: {
          higherBid: () =>
            checkName(
              data?.minPrice.taken,
              data?.minPrice.beatable,
              parseFloat(data?.minPrice?.price || ''),
              parseFloat(price || minBid)
            ),
        },
        pattern: {
          value: lettersNumbers.value,
          message: lettersNumbers.message,
        },
      }}
      error={errors?.desired?.message}
      property="desired"
      maxLength={25}
      onBlur={async e => {
        getCheckName({ variables: { name: e.target.value } })
      }}
      placeholder="choose a name which isn't taken yet!"
      label="portrait name"
    />
  )
}

export default InputDesired
