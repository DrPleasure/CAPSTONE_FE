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
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('http://localhost:3001/events');
      console.log(data);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const onMapLoad = (map) => {
    console.log("Map loaded:", map);
    map.setZoom(13);
  };

  const handleMarkerClick = (event) => {
    setSelectedEvent(event);
  };

  const handleInfoWindowClose = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={containerStyle}>
      <GoogleMap
        apiKey={process.env.REACT_APP_GOOGLE_KEY}
        onLoad={onMapLoad}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {events.map((event) => (
          <Marker
            key={event._id}
            position={{ lat: event.latitude, lng: event.longitude }}
            onClick={() => handleMarkerClick(event)}
          >
            {selectedEvent === event ? (
              <InfoWindow
                anchor={selectedEvent && selectedEvent.anchor}
                onCloseClick={handleInfoWindowClose}
              >
                <div>
                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                      <img src={selectedEvent.image} alt={selectedEvent.title} />

                  <p>{event.description}</p>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
}
