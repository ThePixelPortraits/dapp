import { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'
import { useForm } from 'react-hook-form'

import useCheckAdmin from '../../hooks/ui/useCheckAdmin'

import { uploadNFTMetadataMutation } from 'api/mutations/mint'
import CustomAttribute from 'components/admin/mint/custom-attribute'
import MintImage from 'components/admin/mint/image'
import NormalAttribute from 'components/admin/mint/normal-attribute'
import Button from 'components/ui/forms/button'
import FormInput from 'components/ui/forms/input'
import PageSection from 'components/ui/page-section'
import Loader from 'components/ui/widgets/loader'

import {
  AddAttributeButton,
  MintButtons,
} from 'components/admin/styled/admin.styled'
import { Flex } from 'components/styled/flex.styled'

const AdminMint = () => {
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [attributeFields, setAttributeFields] = useState(0)
  const [normalAttributes, setNormalAttributes] = useState([])
  const [attributes, setAttributes] = useState([])
  const [formDisabled, setFormDisabled] = useState(true)
  const [S3ImageUrl, setS3ImageUrl] = useState('')
  const [metadataLocation, setMetadataLocation] = useState('')
  const [uploadNFTMetadata, { loading }] = useMutation(
    uploadNFTMetadataMutation,
    {
      onCompleted: data => {
        setMetadataLocation(data.uploadNFTMetadata.Location)
      },
    }
  )
  const normalFields = [
    'character',
    'hair',
    'expression',
    'background',
    'accessory',
    'special',
    'bodywear',
  ]

  if (!account) {
    return <Loader />
  }

  if (!isAdmin) {
    return null
  }

  const onSubmit = async ({ name, description }) => {
    const metadata = {
      name,
      description,
      image: S3ImageUrl,
      attributes: [...normalAttributes, ...attributes],
    }

    await uploadNFTMetadata({ variables: { metadata } })
  }

  return (
    <PageSection
      pageTitle="mint portrait"
      style={{ border: '1px solid #f5f5f5', background: '#fafafa' }}
    >
      <Flex style={{ gap: '16px', margin: '16px 0' }}>
        <div style={{ width: '50%' }}>
          <MintImage
            setFormDisabled={setFormDisabled}
            setS3ImageUrl={setS3ImageUrl}
          />
        </div>
        <div style={{ width: '50%' }}>
          {!formDisabled ? (
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <FormInput
                register={register}
                error={errors?.name?.message}
                property="name"
                label="name"
                withoutLabel
                style={{ background: '#fff' }}
              />
              <FormInput
                register={register}
                error={errors?.description?.message}
                property="description"
                label="description"
                type="textarea"
                withoutLabel
              />
              <Flex style={{ flexDirection: 'column' }}>
                {normalFields.map(field => (
                  <NormalAttribute
                    register={register}
                    name={field}
                    normalAttributes={normalAttributes}
                    setNormalAttributes={setNormalAttributes}
                  />
                ))}
                {[...Array(attributeFields)].map((trait, index) => (
                  <CustomAttribute
                    register={register}
                    index={index}
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                ))}
                <AddAttributeButton
                  type="button"
                  size="small"
                  onClick={() => {
                    setAttributeFields(attributeFields + 1)
                  }}
                >
                  + add attribute
                </AddAttributeButton>
                <MintButtons>
                  <strong style={{ paddingRight: '16px' }}>
                    {loading ? <Loader /> : metadataLocation}
                  </strong>
                  <Button
                    type="submit"
                    style={{
                      width: 'auto',
                      marginLeft: 'auto',
                    }}
                  >
                    Mint NFT
                  </Button>
                </MintButtons>
              </Flex>
            </form>
          ) : (
            <Flex
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              upload an image first!
            </Flex>
          )}
        </div>
      </Flex>
    </PageSection>
  )
}

export default AdminMint
