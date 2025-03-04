'use client'

import { useState, useRef } from 'react'
import {circle as turfCircle, point as turfPoint } from '@turf/turf'

import Map from './Map'
import Card from './Card'
import Modal from './Modal'
import { getFeatures, findProperties } from './data/repository'
import SearchForm from './SearchForm'
import './styles.css'

export default function Home() {
  // the data to be displayed on the map (this is static, but could be updated dynamically as the map view changes)
  const [currentViewData, setCurrentViewData] = useState([])
  // stores the feature that the user is currently viewing (triggers the modal)
  const [activeFeature, setActiveFeature] = useState()
  // a ref to hold the Mapbox GL JS Map instance
  const mapInstanceRef = useRef()

  // Store image blob urls
  const [imageUrls, setImageUrls] = useState({});

  // when the map loads
  const handleMapLoad = async  (map) => {
    mapInstanceRef.current = map
    const properties = await getFeatures();
    setCurrentViewData(properties);
  }

  // on click, set the active feature
  const handleFeatureClick = (feature) => {
    console.log('Set feature', feature);
    setActiveFeature(feature)
  }

  // when the modal is closed, clear the active feature
  const handleModalClose = () => {
    setActiveFeature(undefined)
  }

  // todo: set url search
  const handleSearch = async (newValue) => {
    console.log(newValue)

    const {lat, long, distance} = newValue;

    const circle = turfCircle(turfPoint([long, lat]), distance / 1000);
    const map = mapInstanceRef.current;

    map.flyTo({
      center: [long, lat],
      zoom: 12,
    });

    map.getLayer("circle-fill") && map.removeLayer("circle-fill");
    map.getSource("circleData") && map.removeSource("circleData");

    map.addSource("circleData", {
      type: "geojson",
      data: circle,
    });

    map.addLayer({
      id: "circle-fill",
      type: "fill",
      source: "circleData",
      paint: {
        "fill-color": "blue",
        "fill-opacity": 0.2,
      },
    });


    const properties = await findProperties(newValue)
    setCurrentViewData(properties);
  }


  return (
    <>
      {activeFeature && (
        <Modal feature={activeFeature} onClose={handleModalClose} imageUrls={imageUrls} setImageUrls={setImageUrls} />
      )}
      <main className='flex flex-col h-full'>
        <div className='relative lg:flex grow shrink min-h-0'>
          <div
            className='grow shrink-0 relative h-full lg:h-auto'
          >
            <div className='absolute top-3 left-3 z-30'>
            </div>
            <Map
              data={currentViewData}
              onLoad={handleMapLoad}
              onFeatureClick={handleFeatureClick}
            />
          </div>
          {/* sidebar */}
          <div className='absolute lg:static top-0 p-4 w-full lg:w-96 shadow-xl z-10 overflow-scroll lg:z-30 h-full lg:h-auto bg-white'>
            <SearchForm onSubmit={handleSearch}/>
            <div className='text-2xl text-black font-semibold w-full mb-1.5'>
              Properties
            </div>
            <div className='mb-4'>
              <div className='font-medium text-gray-500'>
                {currentViewData.length} results
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4' data-testid={`card-list`}>
              {currentViewData.map((feature, i) => {
                return (
                  <div key={feature.id} className='mb-1.5' data-testid={`card-${feature.id}`}>
                    <Card feature={feature} onClick={handleFeatureClick} />
                  </div>
                )
              })}
            </div>
          </div>
          {/* end sidebar */}
        </div>
      </main>
    </>
  )
}
