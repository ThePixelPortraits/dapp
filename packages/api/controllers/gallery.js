import fetch from 'node-fetch'

// get gallery
export const apiGetGallery = async ({ limit, offset }) => {
  try {
    const pixelsCollection = await fetch(
      `https://api.opensea.io/api/v1/assets?order_direction=desc&limit=${
        limit || 20
      }&collection=the-pixel-portraits-og&offset=${offset || 0}`
    )
    return await pixelsCollection.json()
  } catch (err) {
    throw new Error(`Error: ${err}`)
  }
}
