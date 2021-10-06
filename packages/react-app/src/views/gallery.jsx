import { useQuery } from '@apollo/react-hooks'
import LazyLoad from 'react-lazyload'

import { getGallery } from 'api/queries/gallery'
import GalleryPage from 'components/gallery/gallery'
import Loader from 'components/ui/widgets/loader'

import { GalleryItem } from 'components/gallery/gallery.styled'
import { PageContentBox, PageTitle } from 'components/styled/App.styled'

const Gallery = () => {
  const iterables = [
    20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320,
    340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540, 560, 580, 600, 620,
    640, 660, 680, 700, 720, 740, 760, 780, 800, 820, 840, 860, 880, 900, 920,
    940, 960, 980, 1000,
  ]
  const { loading, error, data } = useQuery(getGallery)

  const filterIds = [20494205, 53854294, 53853641, 53120819]

  if (loading || error) return <Loader />

  return (
    <>
      <PageTitle>gallery</PageTitle>
      <PageContentBox>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
          {data?.gallery?.assets?.map(
            ({ image_preview_url, name, permalink, id }) =>
              !filterIds.includes(id) && (
                <GalleryItem>
                  <a href={permalink} target="_blank" rel="noreferrer">
                    <img src={image_preview_url} alt={name} />
                    <div>{name}</div>
                  </a>
                </GalleryItem>
              )
          )}
        </div>
      </PageContentBox>
      {iterables.map(offset => (
        <LazyLoad
          offset={200}
          style={{
            width: '100%',
            minHeight: '800px',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <GalleryPage offset={offset} />
        </LazyLoad>
      ))}
    </>
  )
}

export default Gallery
