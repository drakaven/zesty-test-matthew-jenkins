// Component for Mapbox GL JS custom HTML Markers
// Given a point feature and map instance, it handles the creation of a Marker and its associated Popup
import { useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl'

const Marker = ({ feature, map, onClick }) => {
  const markerEl = useRef()

  useEffect(() => {

    const marker = new mapboxgl.Marker()

    marker.setLngLat(feature.geometry.coordinates)
    marker.addTo(map)
    marker.getElement().addEventListener('click', () => onClick(feature))

    markerEl.current = marker

    return () => {
      if (markerEl.current) {
        markerEl.current.remove()
      }
    }
  }, [feature.properties.id])


  if (!feature) return null

  return (
    <>
    </>
  )
}

export default Marker
