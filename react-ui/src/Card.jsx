
export const PropertyData = ({ feature }) => {
  const {
    id,
    long,
    lat,
  } = feature.properties

  return (
    <div>
      <h5
        className={
          'mb-1.5  font-bold tracking-tight'}
      >
        id: {id}
      </h5>
      <p className={'mb-4 font-normal'}>
        lat: {lat} • long: {long}
      </p>
    </div>
  )
}

const Card = ({ feature, onClick }) => {
  const handleClick = () => {
    onClick(feature)
  }

  return (
    <div className='cursor-pointer' onClick={handleClick} >
      <div
        className='bg-white border border-gray-200 rounded-2xl p-3'
        style={{
          width: 'auto',
          boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)',
        }}
      >
        <PropertyData feature={feature} />
      </div>
    </div>
  )
}

export default Card
