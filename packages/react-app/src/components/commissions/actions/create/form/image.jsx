import {
  FormImage,
  Preview,
  PreviewContainer,
  SelectImageButton,
  Upload,
  UploadButton,
  UploadContainer,
} from 'components/styled/page.styled'

const InputImage = ({ register, onChange, thumbnail }) => (
  <FormImage>
    <UploadContainer>
      <UploadButton htmlFor="image">
        <p style={{ margin: '0 0 15px 0' }}>
          (optional) share a reference pic to help us see your vision!
        </p>
        <SelectImageButton>upload image</SelectImageButton>
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
    <PreviewContainer>
      <Preview alt="image-preview" src={thumbnail} />
    </PreviewContainer>
  </FormImage>
)

export default InputImage
