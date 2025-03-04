import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


import StaticMapImage from './StaticMap'
import MapboxTooltip from './MapboxTooltip'
import { PropertyData } from './Card'
import { getImageUrl } from './data/repository'

const Modal = ({ feature, onClose, setImageUrls, imageUrls }) => {
  console.log('Modal', feature);
  const [lng, lat] = feature.geometry.coordinates

  let imageUrl = ''
  const id = feature.properties.id

  if (imageUrls[id]) {
    imageUrl = imageUrls[id]
  } else {
    getImageUrl(id).then(imageUrl => {setImageUrls({...imageUrls, [id]: imageUrl})})
  }

  return (
    <>
      {/* gray out background */}
      <div className='justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        {/* modal outer container */}
        <div
          className=' shadow-lg absolute flex flex-col px-3 '
          style={{
            width: 550,
            maxWidth: '100%'
          }}
        >
          {/* modal inner container */}
          <div className='bg-white outline-none focus:outline-none overflow-scroll rounded-2xl my-12 relative'>
            <div className='absolute top-0 right-0 m-6'>
              <button
                className='z-50 h-8 w-8 bg-gray-100 hover:bg-gray-200 flex justify-center items-center rounded-md '
                onClick={onClose}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  size='lg'
                  className='text-gray-500'
                />
              </button>
            </div>
            { imageUrl ? (
            <div
              className='bg-cover h-80 lg:h-80 '
              style={{
                backgroundImage: `url("${imageUrl}")`
              }}
            />) : <div className='p-6'>Loading Image...</div>}
            <div className='p-6'>
              <PropertyData feature={feature} />
              <div>
                <div className='relative'>
                  <MapboxTooltip
                    title='Static Images API'
                    className='absolute top-3 left-3'
                  >
                  </MapboxTooltip>
                  <StaticMapImage lng={lng} lat={lat} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  )
}

Modal.propTypes = {
  feature: PropTypes.shape({
    geometry: PropTypes.shape({
      coordinates: PropTypes.any
    }),
    properties: PropTypes.shape({
      imageUrl: PropTypes.any
    })
  }),
  onClose: PropTypes.any
}

export default Modal
