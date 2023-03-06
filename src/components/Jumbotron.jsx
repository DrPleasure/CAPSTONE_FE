import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import "./Jumbotron.css"
import jumboimage from "../assets/jumbo.png"

export default function Jumbotron() {
    const [showBasic, setShowBasic] = useState(false);

    return (
        <div className='jumbotron'>
      <header>
        <MDBNavbar expand='lg' light bgColor='white'>
          <MDBContainer fluid>
            <MDBNavbarToggler
              onClick={() => setShowBasic(!showBasic)}
              aria-controls='navbarExample01'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <MDBIcon fas icon='bars' />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showBasic}>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
 
<div className="d-flex justify-content-center col-12">
        <div class
          className='p-5 text-center bg-image col-6'
          style={{
            backgroundImage: `url(${jumboimage})`,
            height: '500px',
            width: '1100px',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
          
        >
          </div>
          <div className='col-6'>
            <h1>Throw the ball human</h1>
          </div>
          </div>
      </header>
      </div>
    );
  }