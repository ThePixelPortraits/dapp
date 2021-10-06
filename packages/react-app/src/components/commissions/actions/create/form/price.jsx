import { rules } from 'components/helpers/validation'
import FormInput from 'components/ui/forms/input'

const InputPrice = ({
  register,
  errors,
  minBid,
  onChange,
  registerOptions,
}) => {
  const { checkMinBid } = rules

  return (
    <FormInput
      register={register}
      registerOptions={{
        required: 'Please enter your price',
        validate: {
          minBid: v => checkMinBid(v, minBid),
          ...registerOptions,
        },
      }}
      error={errors?.price?.message}
      property="price"
      defaultValue={minBid}
      maxLength={3}
      onChange={onChange}
      label="bid"
      style={{ textAlign: 'center' }}
    />
  )
}

export default InputPrice
