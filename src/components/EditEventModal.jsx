import React, { useState } from 'react';
import axios from 'axios';
import './EditEventModal.css';

const EditEventModal = ({ event, onClose, onEventUpdated }) => {
  const [eventData, setEventData] = useState({
    title: event.title,
    category: event.category,
    image: event.image,
    description: event.description,
    date: event.date,
    location: event.location,
    minPlayers: event.minPlayers,
    maxPlayers: event.maxPlayers
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.put(
        `https://capstonebe-production.up.railway.app/events/${event._id}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onEventUpdated(response.data);
      onClose();
    } catch (err) {
      console.error("Error updating event:", err);
    }
    
  };

  return (
    <div className="container mt-3" id='eventform'>
      <button
        type="button"
        className="btn-close float-end my-2"
        aria-label="Close"
        id='closeformbutton'
        onClick={onClose}
      ></button>
      <h2 className='fs-2 fw-bold'>Edit Event</h2>
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
          <input         type="text"
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
    <button className="btn my-2 fw-bolder" id='buttoner'>
      Update Event
    </button>
  </form>
</div>
);
};

export default EditEventModal;
           
