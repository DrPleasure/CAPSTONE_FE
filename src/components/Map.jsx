import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 55.6761,
  lng: 12.5683,
};

export default function Map() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await axios.get('http://localhost:3001/locations/map');
      setLocations(data);
    };
    fetchLocations();
  }, []);

  const onMapLoad = (map) => {
    // You can use the `map` object to customize the map, e.g. set the zoom level
    map.setZoom(13);
  };

  return (
    <div style={containerStyle}>
      <GoogleMap
        onLoad={onMapLoad}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {locations.map((location) => (
          <Marker
            key={location._id}
            position={{ lat: location.latitude, lng: location.longitude }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
