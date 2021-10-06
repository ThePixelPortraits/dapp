import styled, { css } from 'styled-components'

import { theme } from 'themes/default.styled'

export const InputStyled = styled.input`
  background: transparent;
  padding: 10px;
  color: #000;
  border: 1px solid #91d5ff;
  border-radius: 0;
  outline: 0;
  width: 100%;
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  @media ${theme.breakpoints.desktopDown} {
    font-size: 16px;
  }

  ${({ error }) =>
    error &&
    css`
      border: 1px solid #f26d7e;
    `}

  &.ant-input:focus,
  &.ant-input-focused {
    border-color: #6e04d8;
    box-shadow: none;
  }

  &.ant-input:hover {
    border-color: #6e04d8;
    box-shadow: none;
  }

  &:focus {
    border-color: #6e04d8;
    outline: 0;
  }

  &:disabled {
    border: 1px solid #cecece;
    color: #666;
  }
`

export const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 15px;
`

export const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  outline: 0;
  color: #000;
  border: 1px solid #91d5ff;
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;

  @media ${theme.breakpoints.desktopDown} {
    font-size: 16px;
  }

  ${({ error }) =>
    error &&
    css`
      border: 1px solid #f26d7e;
    `}

  &.ant-input:focus,
  &.ant-input-focused {
    border-color: #6e04d8;
    box-shadow: none;
  }

  &.ant-input:hover {
    border-color: #6e04d8;
    box-shadow: none;
  }

  &:focus {
    border-color: #6e04d8;
  }
`

export const InputWrapper = styled.div`
  margin-bottom: ${({ noMargin }) => (noMargin ? 0 : '15px')};

  &:last-child {
    margin-bottom: 0;
  }
`

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;

  ${({ noMargin }) =>
    noMargin &&
    css`
      margin-top: 0;
    `}

  &:first-child {
    margin-top: 0;
  }
`

export const FormLabel = styled.div``

export const Error = styled.div`
  background: #f26d7e;
  padding: 10px;
  color: #fff;

  ${({ placement }) =>
    placement &&
    css`
      width: 100%;
      text-align: center;
    `}
`
