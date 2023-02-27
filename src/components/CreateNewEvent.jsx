import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './CreateNewEvent.css';

export default function CreateNewEvent() {

    const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    date: '',
    location: '',
    minPlayers: '',
    maxPlayers: ''
  });

  const handleChange = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const token = localStorage.getItem('accessToken');
        await axios.post('http://localhost:3001/events', eventData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Event created successfully!');
         // Navigate to home page and scroll to bottom
         navigate('/');
         window.scrollTo(0, document.body.scrollHeight);

         // Fetch events to get newly created event
         const response = await axios.get('http://localhost:3001/events');
         const events = response.data;
         const createdEvent = events.find(event => event.title === eventData.title);

         console.log(createdEvent);
       } catch (err) {
         alert(`Error creating event: ${err.message}`);
       }
     };

  return (
    <div className="container mt-3">
        
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category...</option>
            <option value="Football">Football</option>
            <option value="Badminton">Badminton</option>
            <option value="Tennis">Tennis</option>
            <option value="Padel">Padel</option>
            <option value="Spikeball">Spikeball</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={eventData.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            className="form-control"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="minPlayers">Minimum Players</label>
          <input
            type="number"
            className="form-control"
            id="minPlayers"
            name="minPlayers"
            value={eventData.minPlayers}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxPlayers">Maximum Players</label>
          <input
            type="number"
            className="form-control"
            id="maxPlayers"
            name="maxPlayers"
            value={eventData.maxPlayers}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
      Create Event
    </button>
  </form>
</div>
);
}