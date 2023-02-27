import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('')

  const handleFirstName = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastName = (event) => {
    setLastName(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }  
  
  const handleCity = (event) => {
    setCity(event.target.value)
  }

  const handleRegister = async () => {
    const details = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      city: city
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(details),
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const fetchURL = 'http://localhost:3001/users/register'

    try {
      let response = await fetch(fetchURL, options)

      if (response.ok) {
        const data = await response.json()
        console.log('Response status:', response.status);
        console.log('Access token:', data.token);
        localStorage.setItem('accessToken', data.accessToken)
        console.log('Saved access token:', localStorage.getItem('accessToken'));
        navigate('/')
      } else {
        console.log('Response status:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }


  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
      First name
      <MDBInput
        wrapperClass="mb-4"
        type="text"
        value={firstName}
        onChange={(event) => handleFirstName(event)}
      />
      Last name
      <MDBInput
        wrapperClass="mb-4"
        type="text"
        value={lastName}
        onChange={(event) => handleLastName(event)}
      />
      Email
      <MDBInput
        wrapperClass="mb-4"
        type="email"
        value={email}
        onChange={(event) => handleEmail(event)}
      />
      Password
      <MDBInput
        wrapperClass="mb-4"
        type="password"
        value={password}
        onChange={(event) => handlePassword(event)}
      />
       City
      <MDBInput
        wrapperClass="mb-4"
        type="text"
        value={city}
        onChange={(event) => handleCity(event)}
      />
      <Button className="mb-4" onClick={handleRegister}>
        Register
      </Button>
      <div className="text-center">
        <p>
          Already have an account? <a href="Login">Sign in</a>
        </p>
      </div>
    </MDBContainer>
  )
}

export default Register
