import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentSection from "./CommentSection";
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
  const [comment, setComment] = useState("");


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
    


    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const { data } = await axios.get(`http://localhost:3001/users/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserId(data._id);
      } catch (error) {
        console.error(error);
      }
    };
  
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

  const shareUrl = `https://your-domain.com/events/${id}`;
  const title = event.title;

  return (
    <div className="container mt-3">
      <h1 className="text-center">{event.title}</h1>
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <img src={event.image} alt="eventimage" width={400} className="" />
          <Button onClick={handleAttendEvent} id="attend-button">
        {isAttending ? "Unattend Event" : "Attend Event"}
      </Button>
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
      
      <div className="attendees d-flex justify-content-between">
        <div className="creator-info">
        <div  style={{ backgroundColor: '#eee' }}>
          <h2>Event Creator</h2>
      <MDBContainer className="container py-2">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol xl={10}>
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src={event.createdBy.avatar}
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                </div>
                <MDBTypography tag="h4">{event.createdBy.firstName} {" "} {event.createdBy.lastName}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  Spikeball & Basket 
                </MDBCardText>
                <div className="mb-4 pb-2">
                <FacebookIcon size={32} round={true} />

                <TwitterIcon size={32} round={true} />

                <WhatsappIcon size={32} round={true} />

                </div>
              
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">13</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Events Created</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">27</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Events Attended</MDBCardText>
                  </div>
                 
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
        </div>
        <div className="comments">
        <CommentSection
  comments={event.comments}
  handleCommentSubmit={handleCommentSubmit}
  comment={comment}
  setComment={setComment}
  eventId={event._id}
  setEvent={setEvent} // add setEvent prop here

/>

        </div>
        <div className="attending">
     
          Attending: {event.attendees.length}{" "}
          {event.attendees.map((attendee) => (
            <div key={attendee._id}>
              <MDBCardImage
                        className="rounded-circle shadow-1-strong me-3"
                        src={attendee.avatar}
                        alt="avatar"
                        width="45"
                        height="45"
                      />
              <span>{attendee.firstName}</span>
            </div>
          ))}
        </div>
   
     

        
      </div>
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
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
      <p>Share this Event!</p>
    </div>
  );
}
