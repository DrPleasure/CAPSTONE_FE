import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentSection from "./CommentSection";
import MessagePopup from "./MessagePopup";
import EditEventModal from './EditEventModal';
import Navbartop from "./Navbartop"

import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { FaFacebookMessenger } from "react-icons/fa";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
  WhatsappIcon,
  FacebookMessengerShareButton,
  MessengerIcon,
} from "react-share";
import { Button } from "react-bootstrap";
import { MDBCardImage, MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBBtn, MDBTypography, MDBIcon } from "mdb-react-ui-kit";
import "./SingleEvent.css"

export default function SingleEvent() {
  const [event, setEvent] = useState(null);
  const { id } = useParams();
  const [isAttending, setIsAttending] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [comment, setComment] = useState("");
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);


  const navigate = useNavigate();


  const handleDeleteEvent = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this event?");
    
    if (confirmation) {
      try {
        await axios.delete(`/events/${id}`);
        alert("Event deleted successfully");
        // Navigate to another page, for example, the events listing page
        navigate('/events');
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Error deleting event");
      }
    }
  };
  
  const handleEventUpdated = (updatedEvent) => {
    // Do something with the updated event, e.g., update state or re-fetch data
  };

const handleReminderChange = async (e) => {
  setReminderSet(e.target.checked);
  // Call your backend API to store the user's reminder preference
};


  const handleShowMessagePopup = () => {
    setShowMessagePopup(true);
  };
  
  const handleCloseMessagePopup = () => {
    setShowMessagePopup(false);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get(`http://localhost:3001/events/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setEvent(data);
        setIsAttending(
          data.attendees.some((attendee) => attendee._id === userId)
        );
      } catch (error) {
        console.error(error);
      }
    };
    
 

    async function fetchUser() {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get(`http://localhost:3001/users/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserId(data._id);
        setUserEmail(data.email);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchEvent();
    fetchUser();
  }, [id, userId]);
  
  
  

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

  const handleAttendEvent = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (isAttending) {
        console.log("Deleting user from attendees array");
        await axios.delete(`http://localhost:3001/events/${id}/attend`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        
        setEvent(prevEvent => {
          const updatedAttendees = prevEvent.attendees.filter(
            attendee => attendee._id !== userId
          );
          setIsAttending(false);
          console.log(updatedAttendees);
          const newEvent = { ...prevEvent, attendees: updatedAttendees };
          console.log(newEvent);
          return newEvent;
        });
        
      } else {
        console.log("Adding user to attendees array");
        await axios.post(
          `http://localhost:3001/events/${id}/attend`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const { data } = await axios.get(`http://localhost:3001/events/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setEvent(data);
        setIsAttending(data.attendees.some((attendee) => attendee._id === userId));
        console.log("Attendees after add:", data.attendees);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const handleCommentSubmit = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.post(
        `http://localhost:3001/events/${id}/comments`,
        { text: comment }, // include the comment text in the request body
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setEvent((prevEvent) => ({ ...prevEvent, comments: data }));
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };
  
  
  
  
  
  

  if (!event) {
    return <div>Loading...</div>;
  }

  // const shareUrl = `http://localhost:3000/events/${id}`;
  const shareUrl = `${window.location.origin}/events/${id}`;
  const title = event.title;

// ... (imports and other parts of the code)

return (

  
  <div className="container mt-3" id="content">
    <Navbartop></Navbartop>
    <MDBRow className="d-flex">
     
      <MDBCol>
        <div className="col-7">
          <img src={event.image} alt="eventimage" width={600} className="my-3" id="eventimage" />
         
        </div>
      </MDBCol>
      <MDBCol>
  <div className="attendees-section col-2">
    <h2 className="text-center mb-4 fw-bold">Attendees ({event.attendees.length})</h2>
    <div className="d-flex justify-content-center flex-wrap">
  {event.attendees.map((attendee) => (
    <Link key={attendee._id} to={`/profile/${attendee._id}`} className="attendee-card p-2  d-flex">
      <MDBCardImage
        className="rounded-circle shadow-1-strong mb-2"
        src={attendee.avatar}
        alt="avatar"
        width="60"
        height="60"
      />
      <span className="d-block">{attendee.firstName}</span>
    </Link>
  ))}
</div>
  </div>
</MDBCol>

       <div className="col-3">
  <h2 className="text-center mb-4">Event Creator</h2>
  <MDBContainer className="container py-2 event-creator">
    <MDBRow className="justify-content-center align-items-center">
      <MDBCol xl={10}>
        <MDBCard className="creator-card" style={{ borderRadius: "15px" }}>
          <MDBCardBody className="text-center">
            <div className="mt-3 mb-4">
              <MDBCardImage
                src={event.createdBy.avatar}
                className="rounded-circle"
                fluid
                style={{ width: "100px" }}
              />
            </div>
            <MDBTypography tag="h4">
              {event.createdBy.firstName} {event.createdBy.lastName}
            </MDBTypography>
            <MDBCardText className="text-muted mb-4">
              Spikeball & Basket
            </MDBCardText>
            <div className="mb-4 pb-2">
              <Button variant="primary" onClick={handleShowMessagePopup}>
                Message Me
              </Button>
              <MessagePopup
                show={showMessagePopup}
                onHide={handleCloseMessagePopup}
                recipientEmail={event.createdBy.email}
                senderEmail={userEmail}
                eventName={event.title}
              />
            </div>

            <div className="d-flex justify-content-between text-center mt-5 mb-2">
              <div>
                <MDBCardText className="mb-1 h5">13</MDBCardText>
                <MDBCardText className="small text-muted mb-0">
                  Events Created
                </MDBCardText>
              </div>
              <div>
                <MDBCardText className="mb-1 h5">42</MDBCardText>
                <MDBCardText className="small text-muted mb-0">
                  Events Attended
                </MDBCardText>
              </div>
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
</div>

       
     
    </MDBRow>

    <h1 className="text-start mx-5 fw-bold">{event.title}</h1>

<div className="d-flex justify-content-between" id="eventinfo">
    <div className="event-info mt-5">
      <h2>Event Information</h2>
      <p>Lets play <strong>{event.category}!</strong></p>
      <p>{event.description}</p>
      <p>
        <strong>Location:</strong> {event.location}
      </p>
      <p>
      <strong>Date & Time:</strong> {formatDate(event.date)}
      </p>

          {userId === event.createdBy._id && (
  <div className="mt-3">
    
 
  </div>
)}
  
    </div>
    <div className="buttons d-flex flex-column justify-content-around mx-1">
    <label htmlFor="reminder-checkbox" className="form-check-label my-3 mx-4">
  Set Reminder
  <input
  type="checkbox"
  id="reminder-checkbox"
  checked={reminderSet}
  onChange={handleReminderChange}
  className="form-check-input mx-3"
/>
</label>


      <Button onClick={handleAttendEvent} className="button-box">
            {isAttending ? "Unattend Event" : "Attend Event"}
          </Button>
          <Button className="button-box" onClick={() => setIsEditModalVisible(true)}>Edit Event</Button>

{isEditModalVisible && (
  <EditEventModal
    event={event}
    onClose={() => setIsEditModalVisible(false)}
    onEventUpdated={handleEventUpdated}
  />
)}
    <Button onClick={handleDeleteEvent} className="button-box my-3"  >
      Delete Event
    </Button>
    </div>
    <div className="">
          <p className="text-center fs-4" id="sharetext">Share Event!</p>
          <div className="d-flex flex-column">
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="Check out this event!"
          >
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
          <FacebookMessengerShareButton
            url={shareUrl}
            subject={title}
            body="Check out this event!"
          >
            <FaFacebookMessenger size={32} round={true} />
          </FacebookMessengerShareButton>
          </div>
        </div> 
   
          
     
    </div>
     
      

      <div className="comments-section mt-5">
        <CommentSection
        eventId={event._id}
          comments={event.comments}
          handleCommentSubmit={handleCommentSubmit}
          comment={comment}
          setComment={setComment}
          setEvent={setEvent}
        />
      </div>
    </div>
  );
}

