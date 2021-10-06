import { useQuery } from '@apollo/react-hooks'

import { getGallery } from 'api/queries/gallery'
import Loader from 'components/ui/widgets/loader'

import { GalleryItem } from 'components/gallery/gallery.styled'

const GalleryPage = ({ offset }) => {
  const { loading, error, data } = useQuery(getGallery, {
    variables: { offset, limit: 20 },
  })

  if (loading || error) return <Loader />

  if (data?.gallery?.detail) {
    return null
  }

  return data?.gallery?.assets?.map(
    ({ id, image_preview_url, name, permalink }) =>
      id !== 20494205 && (
        <GalleryItem>
          <a href={permalink} target="_blank" rel="noreferrer">
            {/* <img src="images/frame.png" /> */}
            <img src={image_preview_url} alt={name} style={{ width: '100%' }} />
            <div>{name}</div>
          </a>
        </GalleryItem>
      )
  )
}

export default GalleryPage
