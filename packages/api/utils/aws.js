const AWS = require('aws-sdk')

const region = 'us-east-1'
const client = new AWS.SecretsManager({ region })

export const getSecrets = async () => {
  const result = await client
    .getSecretValue({
      SecretId: 'SECRET_ID',
    })
    .promise()
  return JSON.parse(result.SecretString)
}
