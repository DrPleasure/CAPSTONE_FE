import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function SingleEvent() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get(`http://localhost:3001/events/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log(data); // add this line
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvent();
  }, [id]);

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

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <h1 className="text-center">{event.title}</h1>
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <img src={event.image} alt="eventimage" />
        </div>
        <div className="col-md-6">
          <p>
            <strong>Category:</strong> {event.category}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Date:</strong> {formatDate(event.date)}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Minimum Players:</strong> {event.minPlayers}
          </p>
        </div>
      </div>
    </div>
  );
}
