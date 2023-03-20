import React, { useState, useEffect } from 'react';
import "./Jumbotron.css"
import jumboimage1 from "../assets/mockup.png"
import jumboimage2 from "../assets/watch.png"
import jumboimage3 from "../assets/ball.png"
import { Link } from 'react-router-dom';
import { Button, Jumbotron } from 'react-bootstrap';
import CreateNewEvent from './CreateNewEvent';
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer,

} from 'mdb-react-ui-kit';
import setBodyColor from './SetBodyColor';


export default function Jumbotroner() {
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [showCreateEventForm, setShowCreateEventForm] = useState(false);

  const handleCreateEventClick = () => {
    setShowCreateEventForm(true);
  };


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setShowSecondButton(true);
    }
  }, []);


 

    return (
      <MDBContainer className=''>
        <div className='d-flex my-5 mx-5 jumbotron'>
          <div className='col-6 my-4 mx-3 d-flex flex-column justify-content-around'>
      <h1 className="display-3 fw-bold">Sportify <img src={jumboimage3} className="image3"></img></h1>
      <p className='fs-4'>
      Sportify is a social sports event platform where you can create and join events for all kinds of sports and skill levels. Whether you're a beginner or an experienced athlete, there's something for everyone here. Join our community and start playing today!
      </p>
      <div>
        <Button variant="success" size="lg" role="button" id='button' onClick={handleCreateEventClick} >
          Create Event
        </Button>
        {showSecondButton && (
          <Link to="/register">
          <Button variant="secondary" size="lg" role="button" id='secondButton' className='ms-2'>
            Register
          </Button>
        </Link>
          )}
</div> 
       </div>
        <div className='col-6'>
    <div className="image-container">
        <img className="image1" src={jumboimage1} alt="First Image" />
        <img className="image2" src={jumboimage2} alt="Second Image" />
    </div>
</div>

      </div>
      {showCreateEventForm && <CreateNewEvent />}

    </MDBContainer>
      );
  }