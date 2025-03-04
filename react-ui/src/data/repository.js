import axios from 'axios'

export const getFeatures = async () => {
  const properties = await axios.get('http://localhost:3000/properties');

  return properties.data.map(property => {
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [property.long, property.lat]
      },
      properties: {
        ...property,
      }
    }
    return feature;
  })
}

export const getImageUrl = async (id) => {
  const imageBlob = await fetch(`http://localhost:3000/display/${id}`).then((response) => response.blob());
  return URL.createObjectURL(imageBlob);
}

export const findProperties = async ({long, lat, distance}) => {
  const json = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [long, lat]
    },
    "x-distance": distance,
  }

  const properties = await axios.post('http://localhost:3000/find', json);
  return properties.data.map(property => {
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [property.long, property.lat]
      },
      properties: {
        ...property,
      }
    }
    return feature;
  })
};


