import gql from 'graphql-tag'

export const uploadMintImageMutation = gql`
  mutation uploadMintImage($image: UploadS3!) {
    uploadMintImage(image: $image)
  }
`

export const uploadNFTMetadataMutation = gql`
  mutation uploadNFTMetadata($metadata: JSONObject!) {
    uploadNFTMetadata(metadata: $metadata)
  }
`
