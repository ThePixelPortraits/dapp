import chalk from 'chalk'
import AWS from 'aws-sdk'
import { Config } from '../models/Config'

const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

// upload portrait image for minting
export const apiUploadMintImage = async ({ image }) => {
  const imageFile = await image
  let result

  try {
    const { createReadStream, filename } = await imageFile.file
    const fileStream = await createReadStream()
    const uploadParams = {
      Bucket: 'S3_BUCKET_NAME',
      Key: filename,
      Body: fileStream,
    }
    result = await s3.upload(uploadParams).promise()
  } catch (e) {
    console.log(chalk.red(`error uploading image: ${e}`))
  }

  return { imageS3Url: result.Location }
}

// upload nft metadata
export const apiUploadNFTMetadata = async ({ metadata }) => {
  try {
    const config = await Config.find()
    const bufferData = Buffer.from(JSON.stringify(metadata))
    const currentMetadata = config[0].currentNFTMetadata
    const filename = currentMetadata ? parseInt(currentMetadata) + 1 : 1
    const uploadParams = {
      Bucket: 'S3_BUCKET_NAME',
      Key: `${filename.toString()}`,
      Body: bufferData,
      ContentEncoding: 'base64',
      ContentType: 'application/json',
      ACL: 'public-read',
    }

    await Config.update({}, { currentNFTMetadata: filename }, { multi: true })

    return await s3.upload(uploadParams).promise()
  } catch (e) {
    console.log(chalk.red(`error uploading metadata: ${e}`))
  }
}
