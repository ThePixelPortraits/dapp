import { A } from 'hookrouter'
import styled from 'styled-components'

import { theme } from 'themes/default.styled'

export const Section = styled.div`
  width: 100%;
  padding: ${({ noPadding }) => (noPadding ? 0 : '15px')};
  margin-bottom: 12px;
  border: ${({ danger }) => (danger ? '1px solid #ffccc7' : 'none')};
  background: ${({ danger }) => (danger ? '#fff2f0' : 'none')};

  @media ${theme.breakpoints.tabletDown} {
    padding: 10px 0 15px 0;
  }
`

export const SubSection = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 25px;
  margin-bottom: 25px;

  &:last-child {
    border-bottom: 0;
  }
`

export const Title = styled.h2`
  display: flex;
  font-family: 'Cutive Mono';
  margin: 0;
  font-size: ${({ smallTitle }) => smallTitle && '18px'};
`
export const SubTitle = styled.h4``

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: ${({ align }) =>
    align === 'right' ? 'flex-end' : 'flex-start'};
  margin-left: ${({ align }) => (align === 'left' ? '0' : 'auto')};
  border-top: ${({ asFooter }) => (asFooter ? '1px solid #eee' : 'none')};
  margin-top: ${({ asFooter }) => (asFooter ? '25px' : '0')};
  padding-top: ${({ asFooter }) => (asFooter ? '25px' : '0')};

  > * {
    margin-right: 25px;

    &:last-child {
      margin-right: 0;
    }
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 15px 15px 15px;
  margin: 72px 0;
  width: 100%;

  @media ${theme.breakpoints.desktopDown} {
    margin-bottom: 20px;
    margin-top: 35px;
    padding: 0;
  }
`

export const Validation = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 0 15px;
  color: ${theme.colors.red};
`

export const FormLink = styled.a`
  display: block;
  padding: 10px 0 5px;
`

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ size }) => (size === 'small' ? '4px 8px' : '8px 16px')};
  background: ${({ background }) => background || theme.colors.aqua};
  text-transform: lowercase;
  font-family: 'Cutive Mono';
  font-size: 1.2rem;
  height: auto;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  border: 1px solid ${theme.colors.aqua};
  border-color: ${({ borderColor }) => borderColor || theme.colors.aqua};
  transition: 0.15s filter linear;

  &:hover {
    filter: brightness(110%);
    border-color: ${({ borderColor }) => borderColor || '#1a9690'};
  }
`

export const SpanButton = styled.span`
  padding: 8px 16px;
  background: ${({ background }) => background || theme.colors.aqua};
  text-transform: lowercase;
  font-family: 'Cutive Mono';
  font-size: 1.2rem;
  height: auto;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  border: 1px solid ${theme.colors.aqua};
  border-color: ${({ borderColor }) => borderColor || theme.colors.aqua};
  transition: 0.15s filter linear;

  &:hover {
    filter: brightness(110%);
    border-color: ${({ borderColor }) => borderColor || '#1a9690'};
  }
`

export const Wave = styled.span`
  display: block;
  margin-left: 10px;
  animation: rotation 5s infinite;
  position: relative;
  width: 100px;
  left: 100px;
  top: -20px;

  @keyframes rotation {
    2%,
    18% {
      transform: rotate(1deg);
      left: 115px;
    }

    4%,
    16% {
      transform: rotate(0deg);
      left: 100px;
    }

    6%,
    10%,
    14% {
      transform: rotate(1deg);
      left: 115px;
    }

    8%,
    12% {
      transform: rotate(0deg);
      left: 100px;
    }

    18.1% {
      transform: rotate(0deg);
      left: 100px;
    }
  }
`

export const ModalContent = styled.div`
  display: flex;
  padding: 48px 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`

export const ModalIcon = styled.img`
  margin-bottom: 24px;
`

export const ModalTitle = styled.div`
  font-size: 24px;
  line-height: 1.8;
  text-align: center;
  margin-bottom: 24px;
`

export const FormImage = styled.div`
  display: flex;
  margin: 15px 0;
  padding: 10px;
  border: 1px solid #91d5ff;
  background: #e6f7ff;
`

export const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
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
  width: 100px;
  height: 100px;
  border: 1px dashed #cecece;
  margin-left: auto;
`

export const Preview = styled.img`
  max-height: 100px;
  max-width: 100px;
`

export const PageLink = styled(A)`
  margin-left: auto;
  border-bottom: 1px solid;
  font-size: 14px;
  margin-top: 15px;
`

export const SelectImageButton = styled.span`
  font-size: 14px;
  padding: 4px 8px;
  background: #fff;
  border: 1px solid #91d5ff;
  color: #000;
  cursor: pointer;
`
