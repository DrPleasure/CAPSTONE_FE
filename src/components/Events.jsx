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
import Dropdown from 'react-bootstrap/Dropdown';
import "./Events.css"



export default function Events() {
  const [eventDistances, setEventDistances] = useState([]);
  const [events, setEvents] = useState([]);
  const [showCreateNewEvent, setShowCreateNewEvent] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


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

  const eventsWithDistances = events.map(event => {
    const eventDistance = eventDistances.find(dist => dist._id === event._id);
    return eventDistance ? { ...event, distance: eventDistance.distance } : event;
  });

  const filteredEvents = eventsWithDistances.filter((event) => {
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
      <div className="container mt-3" id="events">
      <div>
      <h1>Locations</h1>
      <Map locations={filteredEvents} setFilteredEvents={setEvents} />
    </div>
        <h1 className="text-center">Upcoming Events</h1>
        <button onClick={handleCreateNewEventClick} id="buttoncreate">Create Event</button>
        {showCreateNewEvent && <CreateNewEvent />}
        <div className="d-flex justify-content-center">
    <div>
      <Dropdown show={showDropdown} onClick={() => setShowDropdown(!showDropdown)}>
        <Dropdown.Toggle variant="outline-secondary">
          Filter
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Header>Category</Dropdown.Header>
          <Dropdown.Item
            onClick={() => setSelectedCategories([])}
            className={selectedCategories.length === 0 ? "active-filter" : ""}
          >
            All Categories
          </Dropdown.Item>
          {["Football", "Badminton", "Tennis", "Padel", "Spikeball", "Basket"].map(category => (
            <Dropdown.Item
              key={category}
              name={category}
              onClick={(e) => { e.stopPropagation(); handleCategoryFilterChange(e); }}
              className={selectedCategories.includes(category) ? "active-filter" : ""}
            >
              {category}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <Dropdown.Header>Time</Dropdown.Header>
          {["Today", "Tomorrow", "This Week", "Next Week"].map(time => (
            <Dropdown.Item
              key={time}
              name={time}
              onClick={(e) => { e.stopPropagation(); handleDayFilterChange(e); }}
              className={selectedDays.includes(time) ? "active-filter" : ""}
            >
              {time}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
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
                      <strong>Location:</strong> {event.location}
                    </Card.Text>
                    <Card.Text>
                      <strong>Description:</strong> {event.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Date:</strong> {formatDate(event.date)}
                    </Card.Text>
                    
                      <Card.Text>
                        <strong>Distance:</strong> {event.distance} km
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