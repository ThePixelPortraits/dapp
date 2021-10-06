import FormInput from 'components/ui/forms/input'

const InputTwitter = ({ register, errors }) => (
  <FormInput
    register={register}
    registerOptions={{
      required: 'Please enter your email or twitter',
    }}
    error={errors?.twitter?.message}
    property="twitter"
    placeholder="make sure correct & dms open!"
  />
)

export default InputTwitter
