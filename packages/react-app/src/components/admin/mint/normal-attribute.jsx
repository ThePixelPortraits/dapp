import { useEffect, useState } from 'react'

import FormInput from 'components/ui/forms/input'

import { Flex } from 'components/styled/flex.styled'

const NormalAttribute = ({
  name,
  register,
  normalAttributes,
  setNormalAttributes,
}) => {
  const [attributeValue, setAttributeValue] = useState('')

  useEffect(() => {
    let newAttributes = [...normalAttributes]

    if (attributeValue !== '') {
      newAttributes = newAttributes.filter(attribute => {
        return Object.keys(attribute)[0] !== name
      })

      newAttributes.push({ [name]: attributeValue })
      setNormalAttributes(newAttributes)
    }
  }, [name, attributeValue])

  return (
    <Flex style={{ width: '100%', gap: '16px' }}>
      <div style={{ width: '50%' }}>{name}</div>
      <div style={{ width: '50%' }}>
        <FormInput
          register={register}
          property={name}
          withoutLabel
          noMargin
          placeholder={name}
          style={{ background: '#fff' }}
          onBlur={e => {
            setAttributeValue(e.target.value)
          }}
        />
      </div>
    </Flex>
  )
}

export default NormalAttribute
