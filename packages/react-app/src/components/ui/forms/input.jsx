import {
  FormRow,
  FormLabel,
  Textarea,
  InputStyled,
  Error,
} from 'components/ui/forms/styled/input.styled'

const FormInput = props => {
  const {
    property,
    type,
    minValue,
    withoutLabel,
    maxLength,
    placeholder,
    label,
    register,
    registerOptions,
    error,
    noMargin,
  } = props
  return (
    <FormRow noMargin={noMargin}>
      {!withoutLabel && <FormLabel>{label || property}</FormLabel>}
      {type === 'textarea' ? (
        <>
          <Textarea
            rows={5}
            placeholder={placeholder || property}
            {...register(property, registerOptions)}
            {...props}
          />
          {error && <Error placement>{error}</Error>}
        </>
      ) : (
        <>
          <InputStyled
            type={type || 'text'}
            placeholder={placeholder || property}
            min={minValue || ''}
            maxLength={maxLength || ''}
            {...register(property, registerOptions)}
            {...props}
          />
          {error && <Error placement>{error}</Error>}
        </>
      )}
    </FormRow>
  )
}

export default FormInput
