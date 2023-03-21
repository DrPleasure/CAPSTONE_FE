import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "./EditProfilePopup.css"

export default function EditProfilePopup({ show, onHide, user, setUser }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [city, setCity] = useState(user.city);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const updatedUser = {
      firstName,
      lastName,
      city,
      avatar,
    };

    try {
      const { data } = await axios.put('http://localhost:3001/users/me', updatedUser, config);
      setUser(data);
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered >
      <Modal.Header closeButton id="modal">
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>    
          <Form.Group controlId="avatar">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
