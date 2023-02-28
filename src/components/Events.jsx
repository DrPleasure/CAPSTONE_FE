import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateNewEvent from './CreateNewEvent';


export default function Events() {
  const [events, setEvents] = useState([]);
  const [showCreateNewEvent, setShowCreateNewEvent] = useState(false);


  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('http://localhost:3001/events');
      setEvents(data);
      console.log(setEvents)
    };
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleCreateNewEventClick = () => {
    setShowCreateNewEvent(true);
  }

  return (
    <div className="container mt-3">
      <h1>Events</h1>
      <button onClick={handleCreateNewEventClick}>Create New Event</button>
      {showCreateNewEvent && <CreateNewEvent />}
      {events.map((event) => (
        <div key={event._id} className="card my-3">
          <div className="card-header">{event.title}</div>
          <div> <img src={event.image} alt="eventimage"></img> </div>
          <div className="card-body">
            <p className="card-text">
              <strong>Category:</strong> {event.category}
            </p>
            <p className="card-text">
              <strong>Description:</strong> {event.description}
            </p>
            <p className="card-text">
              <strong>Date:</strong> {formatDate(event.date)}
            </p>
            <p className="card-text">
              <strong>Location:</strong> {event.location}
            </p> 
            <p className="card-text">
              <strong>We Need Minimum:</strong> {event.minPlayers} Players! <br/>
              <strong>But No More Than:</strong>  {event.maxPlayers} Players!
              
            </p> 
            <p className="card-text">
              <strong>Current:</strong> {event.attendees.length} Players! <br/>
              
              
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};


