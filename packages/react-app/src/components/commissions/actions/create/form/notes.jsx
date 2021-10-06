import FormInput from 'components/ui/forms/input'

const InputNotes = ({ register, errors }) => (
  <FormInput
    register={register}
    registerOptions={{
      required: 'Please enter some notes',
    }}
    error={errors?.notes?.message}
    property="notes"
    type="textarea"
    placeholder="help the artist understand what you'd like in your portrait"
    noMargin
  />
)

export default InputNotes
