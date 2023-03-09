import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateNewEvent from "./CreateNewEvent";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Map from "./Map";
import GoogleMapReact from 'google-map-react';
import SingleEvent from "./SingleEvent"


export default function Events() {
  const [events, setEvents] = useState([]);
  const [showCreateNewEvent, setShowCreateNewEvent] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await axios.get("http://localhost:3001/events/locations/map");
      setLocations(data);
    };
    fetchLocations();
  }, []);



  useEffect(() => {
    const fetchEvents = async () => {
      const params = {};

      if (selectedCategories.length > 0) {
        params.category = selectedCategories;
      }

      if (selectedDays.length > 0) {
        params.days = selectedDays;
      }

      const { data } = await axios.get("http://localhost:3001/events", {
        params,
      });
      setEvents(data);
    };
    fetchEvents();
  }, [selectedCategories, selectedDays]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleCreateNewEventClick = () => {
    setShowCreateNewEvent(true);
  };

  const handleCategoryFilterChange = (event) => {
    const category = event.target.name;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((selectedCategory) => selectedCategory !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDayFilterChange = (event) => {
    const day = event.target.name;
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (selectedCategories.length === 0 && selectedDays.length === 0) {
      return true;
    }

    let categoryMatch = true;
    if (selectedCategories.length > 0) {
      categoryMatch = selectedCategories.includes(event.category);
    }

    let dayMatch = true;
    if (selectedDays.length > 0) {
      const eventDate = new Date(event.date);
      const eventDay = eventDate.toLocaleString("default", { weekday: "long" });
      dayMatch = selectedDays.includes(eventDay);
    }

    return categoryMatch && dayMatch;
  });

  return (
    <>
      <div className="container mt-3">
      <div>
      <h1>Locations</h1>
      <Map locations={locations} />
    </div>
        <h1 className="text-center">Upcoming Events</h1>
        <button onClick={handleCreateNewEventClick}>Create New Event</button>
        {showCreateNewEvent && <CreateNewEvent />}
        <div className="d-flex justify-content-center">
          <div className="btn-group me-2" role="group">
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedCategories.length === 0 ? "active" : ""
              }`}
              onClick={() => setSelectedCategories([])}
            >
              All Categories
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedCategories.includes("Football") ? "active" : ""
              }`}
              name="Football"
              onClick={handleCategoryFilterChange}
            >
              Football
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedCategories.includes("Badminton") ? "active" : ""
              }`}
              name="Badminton"
              onClick={handleCategoryFilterChange}
            >
              Badminton
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedCategories.includes("Tennis") ? "active" : ""
              }`}
              name="Tennis"
              onClick={handleCategoryFilterChange}
            >
              Tennis
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedCategories.includes("Padel") ? "active" : ""
              }`}
              name="Padel"
              onClick={handleCategoryFilterChange}
            >
              Padel
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedCategories.includes("Spikeball") ? "active" : ""
              }`}
              name="Spikeball"
              onClick={handleCategoryFilterChange}
            >
              Spikeball
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedCategories.includes("Basket") ? "active" : ""
              }`}
              name="Basket"
              onClick={handleCategoryFilterChange}
            >
              Basket
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedDays.includes("Today") ? "active" : ""
              }`}
              name="Today"
              onClick={handleDayFilterChange}
            >
              Today
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedDays.includes("Tomorrow") ? "active" : ""
              }`}
              name="Tomorrow"
              onClick={handleDayFilterChange}
            >
              Tomorrow
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedDays.includes("This Week") ? "active" : ""
              }`}
              name="This Week"
              onClick={handleDayFilterChange}
            >
              This Week
            </button>
            <button
              type="button"
              className={`btn btn-outline-secondary ${
                selectedDays.includes("Next Week") ? "active" : ""
              }`}
              name="Next Week"
              onClick={handleDayFilterChange}
            >
              Next Week
            </button>
          </div>
        </div>
        <Row xs={1} md={2} className="g-4">
          {filteredEvents.map((event) => (
<Col key={event._id}>
<Link to={{ pathname: `/events/${event._id}`, state: { event } }}>
<Card>
<Card.Img variant="top" src={event.image} alt="eventimage" />
<Card.Body>
<Card.Title>{event.title}</Card.Title>
<Card.Text>
<strong>Category:</strong> {event.category}
</Card.Text>
<Card.Text>
<strong>Description:</strong> {event.description}
</Card.Text>
<Card.Text>
<strong>Date:</strong> {formatDate(event.date)}
</Card.Text>
</Card.Body>
</Card>
</Link>
</Col>
))}
</Row>
</div>
</>
);
}
