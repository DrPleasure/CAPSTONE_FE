import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaSun, FaMoon } from 'react-icons/fa';
import image from "../assets/logo.png";
import MyProfileHome from './MyProfileHome';
import { Link } from 'react-router-dom';
import "./Navbartop.css";

export default function Navbartop() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    const body = document.querySelector('body');
    body.classList.toggle('dark-mode');
  };

  return (
    <div id='navbro'>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand href="/">
            <img 
              alt=""
              src={image}
              width="40"
              height="40"
              className="d-inline-block align-top NavbarLogo"
            />{' '}
          </Navbar.Brand>
          <Link to='/myprofile'>
            <MyProfileHome/>
          </Link>
          <button
            type="button"
            className="btn btn-link"
            onClick={handleDarkModeToggle}
            style={{ color: darkMode ? "white" : "black" }}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </Container>
      </Navbar>
    </div>
  )
}
