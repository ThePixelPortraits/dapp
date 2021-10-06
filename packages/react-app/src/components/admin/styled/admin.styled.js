import styled from 'styled-components'

import Button from 'components/ui/forms/button'

import { Flex } from '../../styled/flex.styled'
import { theme } from 'themes/default.styled'

export const CommissionField = styled.div`
  padding: 5px 0;
  word-break: break-all;

  > span:first-child {
    font-weight: bold;
    color: ${theme.colors.red};
  }
`

export const AddAttributeButton = styled(Button)`
  width: auto;
  margin-left: auto;
  background: ${theme.colors.lightPurple};
  font-size: 1rem;
  border: 0;
`

export const MintButtons = styled(Flex)`
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
`

export const UploadButton = styled.label`
  input[type='file'] {
    display: none;
  }
`

export const Upload = styled.input``

export const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  margin: 16px 0;
`

export const Preview = styled.img`
  margin-left: auto;
  width: 100%;
  height: fit-content;
`

export const FormImage = styled.div`
  display: flex;
  gap: 16px;
  margin: 15px 0;
  padding: 10px;
  align-items: center;
  justify-content: center;
`

export const SelectImageButton = styled.span`
  display: block;
  font-size: 1.2rem;
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #91d5ff;
  color: #000;
  cursor: pointer;
  border-radius: 3px;
`

export const MintImageContainer = styled.div`
  background: #fff;
  border: 1px solid #ededed;
  border-radius: 5px;
  padding: 16px 0;
`
