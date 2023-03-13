import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { FaSun, FaMoon } from 'react-icons/fa';
import Basketballimage from "../assets/basketball.jpg";
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
    <div>
      <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'}>
        <Container>
          <Navbar.Brand href="#home">
            <img 
              alt=""
              src={Basketballimage}
              width="30"
              height="30"
              className="d-inline-block align-top NavbarLogo"
            />{' '}
          
          </Navbar.Brand>
          <Link to='/myprofile'>
            <MyProfileHome/>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <label className="switch">
                <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
                <span className="slider round" style={{ '--dot-color': darkMode ? '#fff' : '#343a40' }}>
                  <span className="icon">{darkMode ? <FaMoon /> : <FaSun />}</span>
                </span>
              </label>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
