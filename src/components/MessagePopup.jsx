import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import "./MessagePopup.css"

export default function MessagePopup({ show, onHide, recipientEmail, senderEmail, eventName }) {
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);


  const handleSubmit = async () => {
    const msg = {
      to: recipientEmail,
      from: senderEmail,
      subject: `${eventName}`,
      text: message,
      html: `<p>${message}</p>`,
    };
  
    try {
      const response = await axios.post("https://capstonebe-production.up.railway.app/events/send-email", msg);
      if (response.status === 200) {
        setShowAlert(true);
        setMessage("");
        console.log("Email sent");
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Modal show={show} onHide={() => {
        setShowAlert(false);
        onHide();
      }} centered>
      <Modal.Header closeButton>
        <Modal.Title>Send a message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && (
          <div className="alert alert-success" role="alert">
            Email sent successfully!
          </div>
        )}
        <Form>
          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="yellowbutton" onClick={onHide}>
          Close
        </Button>
        <Button className="yellowbutton" onClick={handleSubmit}>
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
}
