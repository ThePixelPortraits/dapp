import Button from 'components/ui/forms/button'

import {
  Preview,
  PreviewContainer,
  Upload,
  UploadButton,
  UploadContainer,
  FormImage,
  SelectImageButton,
  MintImageContainer,
} from 'components/admin/styled/admin.styled'
import { Flex } from 'components/styled/flex.styled'

const InputMintImage = ({ register, onChange, thumbnail }) => (
  <MintImageContainer>
    <Flex
      style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}
    >
      <PreviewContainer>
        <Preview alt="image-preview" src={thumbnail} />
      </PreviewContainer>
    </Flex>
    <FormImage style={{ marginTop: 0 }}>
      <UploadContainer>
        <UploadButton htmlFor="image">
          <SelectImageButton>select image</SelectImageButton>
          <Upload
            register={register}
            name="image"
            id="image"
            type="file"
            accept="image/*"
            onChange={onChange}
          />
        </UploadButton>
      </UploadContainer>
      <Button>upload image</Button>
    </FormImage>
  </MintImageContainer>
)

export default InputMintImage
