import { useState, useEffect } from 'react'

import FormInput from 'components/ui/forms/input'

import { Flex } from 'components/styled/flex.styled'

const CustomAttribute = ({ register, index, attributes, setAttributes }) => {
  const [attributeName, setAttributeName] = useState('')
  const [attributeValue, setAttributeValue] = useState('')

  useEffect(() => {
    let newAttributes = [...attributes]

    if (attributeName !== '' && attributeValue !== '') {
      newAttributes = newAttributes.filter(attribute => {
        return Object.keys(attribute)[0] !== attributeName
      })

      newAttributes.push({ [attributeName]: attributeValue })
      setAttributes(newAttributes)
    }
  }, [attributeName, attributeValue])

  return (
    <Flex style={{ width: '100%', gap: '4px' }}>
      <div style={{ width: '50%' }}>
        <FormInput
          register={register}
          property={`attributes-name${index}`}
          withoutLabel
          placeholder="attribute name"
          style={{ background: '#fff' }}
          onBlur={e => {
            setAttributeName(e.target.value)
          }}
        />
      </div>
      <div style={{ paddingTop: '8px' }}>-</div>
      <div style={{ width: '50%' }}>
        <FormInput
          register={register}
          property={`attributes-value${index}`}
          withoutLabel
          noMargin
          placeholder="attribute value"
          style={{ background: '#fff' }}
          onBlur={e => {
            setAttributeValue(e.target.value)
          }}
        />
      </div>
    </Flex>
  )
}

export default CustomAttribute
