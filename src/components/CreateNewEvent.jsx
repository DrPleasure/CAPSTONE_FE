import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './CreateNewEvent.css';

export default function CreateNewEvent({onCloseForm}) {

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
    <div className="container mt-3" id='eventform'>
         <button
    type="button"
    className="btn-close float-end my-2"
    aria-label="Close"
    id='closeformbutton'
    onClick={onCloseForm}
  ></button>
      <h2 className='fs-2 fw-bold'>Create New Event</h2>
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
            <option value="Basket">Basket</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            placeholder='image URL'
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
            placeholder='Any details specific to the event. What do people need to bring?'

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
            placeholder="Not required"
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
            placeholder="Not required"
          />
        </div>
        <button  className="btn  my-2 fw-bolder" id='buttoner'>
      Create Event
    </button>
  </form>
</div>
);
}