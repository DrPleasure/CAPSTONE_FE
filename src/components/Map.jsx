import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

export default function Map({ locations }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [sortedEvents, setSortedEvents] = useState([]);
  const [center, setCenter] = useState({
    lat: 55.6761,
    lng: 12.5683,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('http://localhost:3001/events');
      console.log(data);
      setEvents(data);
      setSortedEvents(data);
    };
    fetchEvents();
  }, [locations]);

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

  const handleSearchLocation = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    );
    console.log('Geocode API results:', data);
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      setCenter({ lat, lng }); // Update center state
      const sorted = events
  .map((event) => {
    const distance = getDistanceFromLatLonInKm(lat, lng, event.latitude, event.longitude).toFixed(1);
    return { ...event, distance };
  })
  .sort((a, b) => a.distance - b.distance);

      setSortedEvents(sorted);
    } else {
      console.log('No results found.');
    }
  };
  
  
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
    return formattedDate;
  };

  return (
    <>
      <div>
        <label>
          Calculate Distances to Events from:
          <input type="text" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />
        </label>
        <button onClick={handleSearchLocation}>Search</button>
      </div>
      <div style={containerStyle}>
        <GoogleMap
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          onLoad={onMapLoad}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          {sortedEvents.map((event) => (
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
                    <h5>{event.category}</h5>
                    <p>{formatDate(event.date)}</p>
                    {event.image && (
                      <img src={event.image} alt={event.title} style={{ maxWidth: '200px' }} />
                    )}
                    <p>{event.description}</p>
                    <p>Distance: {event.distance} km</p>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </div>
      <div>
        <h2>Events</h2>
        <ul>
          {sortedEvents.map((event) => (
            <li key={event._id}>
              <h3>{event.title}</h3>
              <h5>{event.category}</h5>
              <p>{event.location}</p>
              <p>{event.date}</p>
              {event.image && (
                <img src={event.image} alt={event.title} style={{ maxWidth: '200px' }} />
              )}
              <p>{event.description}</p>
              <p>Distance: {event.distance} km</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
              }  
