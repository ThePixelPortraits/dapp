import { useState } from 'react'

import { useMutation } from '@apollo/react-hooks'
import { useWeb3React } from '@web3-react/core'
import { useForm } from 'react-hook-form'

import { uploadMintImageMutation } from 'api/mutations/mint'
import InputMintImage from 'components/admin/mint/image-mint'
import Loader from 'components/ui/widgets/loader'
import useCheckAdmin from 'hooks/ui/useCheckAdmin'

const MintImage = ({ setFormDisabled, setS3ImageUrl }) => {
  const { account } = useWeb3React()
  const isAdmin = useCheckAdmin(account)
  const { register, handleSubmit } = useForm()
  const [thumbnail, setThumbnail] = useState('/images/image-preview.png')
  const [formImage, setFormImage] = useState('')
  const [uploadImage, { loading }] = useMutation(uploadMintImageMutation, {
    onCompleted: data => {
      setS3ImageUrl(data.uploadMintImage.imageS3Url)
    },
  })

  if (!account || loading) {
    return <Loader />
  }

  if (!isAdmin) {
    return null
  }

  const onSubmit = async () => {
    try {
      await uploadImage({
        variables: {
          image: formImage,
        },
      })

      setFormDisabled(false)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <InputMintImage
        register={register}
        thumbnail={thumbnail}
        onChange={event => {
          const image = event.currentTarget.files[0]
          setFormImage(image)
          setThumbnail(URL.createObjectURL(image))
        }}
      />
    </form>
  )
}

export default MintImage
