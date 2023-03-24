import React, { useEffect, useState, useRef } from "react";
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
import { motion } from "framer-motion"



export default function Events() {
  const [eventDistances, setEventDistances] = useState([]);
  const [events, setEvents] = useState([]);
  const [showCreateNewEvent, setShowCreateNewEvent] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [sliderValue, setSliderValue] = useState(5);
  const [maxDistance, setMaxDistance] = useState(Infinity);
  const [selectedId, setSelectedId] = useState(null);
const [canDrag, setCanDrag] = useState(false);
const containerRefs = useRef({});
const [searchPerformed, setSearchPerformed] = useState(false);








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
  }, [selectedCategories, selectedDays, maxDistance]);

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

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
    setMaxDistance(parseFloat(e.target.value));
  };
  
  

  const handleDayFilterChange = (event) => {
    const time = event.target.name;
    if (selectedDays.includes(time)) {
      setSelectedDays(selectedDays.filter((selectedTime) => selectedTime !== time));
    } else {
      setSelectedDays([...selectedDays, time]);
    }
  };
  

  const handleCloseForm = () => {
    setShowCreateNewEvent(false);
  };
  
  const handlePanEnd = (e, info, eventId) => {
    if (selectedId) {
      if (Math.abs(info.offset.x) < 5) {
        const styles = getComputedStyle(containerRefs.current[eventId]);
        const timeout = styles.transform.split(',')[4] * -0.6;
        setCanDrag(false);
        setTimeout(() => {
          setSelectedId(null);
        }, timeout);
      }
    } else {
      setCanDrag(true);
      setSelectedId(eventId);
    }
  };
  

  const eventsWithDistances = events.map(event => {
    const eventDistance = eventDistances.find(dist => dist._id === event._id);
    return eventDistance ? { ...event, distance: eventDistance.distance } : event;
  });

  const filteredEvents = eventsWithDistances.filter((event) => {
    if (selectedCategories.length === 0 && selectedDays.length === 0 && maxDistance === Infinity) {
      return true;
    }
  
    let categoryMatch = true;
    if (selectedCategories.length > 0) {
      categoryMatch = selectedCategories.includes(event.category);
    }
  
    let dayMatch = true;
    if (selectedDays.length > 0) {
      const eventDate = new Date(event.date);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
  
      dayMatch = selectedDays.some((selectedDay) => {
        if (selectedDay === "Today" && eventDate.toDateString() === today.toDateString()) {
          return true;
        }
        if (selectedDay === "Tomorrow" && eventDate.toDateString() === tomorrow.toDateString()) {
          return true;
        }
        if (selectedDay === "This Week" && eventDate >= today && eventDate < nextWeek) {
          return true;
        }
        if (selectedDay === "Next Week" && eventDate >= nextWeek && eventDate < nextWeek * 2) {
          return true;
        }
        return false;
      });
    }
  
    let distanceMatch = true;
    if (maxDistance !== Infinity) {
      distanceMatch = event.distance <= maxDistance;
    }
  
    return categoryMatch && dayMatch && distanceMatch;
  });
  
  

  return (
    <>
      <div className="container mt-3" id="events">
      <div>
      <Map locations={filteredEvents} setFilteredEvents={setEvents} eventDistances={eventDistances} setEventDistances={setEventDistances}   setSearchPerformed={setSearchPerformed}
/>


    </div>
        
        <div className="d-flex justify-content-around mb-5" id="sliderdiv">
          <div>
        <button onClick={handleCreateNewEventClick} id="buttoncreate">Create Event</button>
        {showCreateNewEvent && <CreateNewEvent onCloseForm={handleCloseForm} />}
        </div>
        {searchPerformed && (
  <div class="range">
    <input
      type="range"
      className="form-range"
      id="customRange1"
      min="0.1"
      max="10"
      step="0.1"
  
      value={sliderValue}
      onChange={handleSliderChange}
      onInput={handleSliderChange}
    />
    <label className="text-center fw-bold fs-5">
      Display events within: {sliderValue} km
    </label>
  </div>
)}

    <div>
      
    <Dropdown show={showDropdown} onClick={() => setShowDropdown(!showDropdown)}>
  <Dropdown.Toggle id="filterdropdown">
    Filter
  </Dropdown.Toggle>
  <Dropdown.Menu id="dropdownmenu">
    <div className="container-fluid" >
      <div className="row">
        <div className="col-md-6">
          <Dropdown.Header className="dropdownheader fw-bold fs-4">Category</Dropdown.Header>
          <hr />
          {/* <Dropdown.Item
            onClick={() => setSelectedCategories([])}
            className={selectedCategories.length === 0 ? "active-filter" : ""}
          >
            All 
          </Dropdown.Item> */}
          {["Football", "Badminton", "Tennis", "Padel", "Spikeball", "Basket"].map(category => (
            <Dropdown.Item
              key={category}
              name={category}
              onClick={(e) => { e.stopPropagation(); handleCategoryFilterChange(e); }}
              className={selectedCategories.includes(category) ? "active-filter" : "dropdownitem fs-6 mb-2"}
            >
              {category}
            </Dropdown.Item>
          ))}
        </div>

        <div className="col-md-6">
          <Dropdown.Header className="dropdownheader fw-bold fs-4">Time</Dropdown.Header>

          <hr />
          {/* <Dropdown.Item
            onClick={() => setSelectedDays([])}
            className={selectedDays.length === 0 ? "active-filter" : ""}
          >
            All Time
          </Dropdown.Item> */}
          {["Today", "Tomorrow", "This Week", "Next Week"].map(time => (
            <Dropdown.Item
              key={time}
              name={time}
              onClick={(e) => { e.stopPropagation(); handleDayFilterChange(e); }}
              className={selectedDays.includes(time) ? "active-filter" : "dropdownitem fs-6 mb-2"}
            >
              {time}
            </Dropdown.Item>
          ))}
        </div>
      </div>
    </div>

  </Dropdown.Menu>
</Dropdown>

    </div>
  </div>
  <Row xs={1} md={3} lg={4} className="g-4">
  {filteredEvents
    .sort((a, b) => a.distance - b.distance)
    .map((event) => (
      <Col key={event._id}>
        <Link className="event-card-link" to={{ pathname: `/events/${event._id}`, state: { event } }}>
          <div>
            <Card id="eventcard" className="fs-6 mb-4 text-center">
              <Card.Img variant="top" src={event.image} alt="eventimage" className="card-img" />
              <Card.Body>
                <Card.Title className="yellowtext fw-bold fs-4 text-center">{event.title}</Card.Title>
                <Card.Text>
                  <strong className="yellowtext">Category:</strong> {event.category}
                </Card.Text> 
                <Card.Text>
                  <strong className="yellowtext">Location:</strong> {event.location}
                </Card.Text>
                <Card.Text>
                  <strong className="yellowtext">Description:</strong> {event.description}
                </Card.Text>
                <Card.Text>
                  <strong className="yellowtext">Date:</strong> {formatDate(event.date)}
                </Card.Text>
                
                  <Card.Text>
                    <strong className="yellowtext">Distance:</strong> {event.distance} km
                  </Card.Text>
                
              </Card.Body>
            </Card>
          </div>
        </Link>
      </Col>
    ))}
</Row>
      </div>
    </>
  );
}