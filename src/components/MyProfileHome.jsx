import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./MyProfileHome.css"

export default function MyProfileHome() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const fetchUser = async () => {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
      };
      const { data } = await axios.get("http://localhost:3001/users/me", config);
      setUser(data);
      console.log("User Data:", data);
    };
    fetchUser();
  }, []);

  return (
    <div className='home-user-info d-flex yellowtext'>
      <p className='mx-2 my-2 fw-bold'> {user.firstName}</p> 
       <img src={user.avatar} className="profile-avatar" ></img>
       
       
    </div>
  );
}
