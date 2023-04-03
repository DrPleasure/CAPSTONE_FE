import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditProfilePopup from './EditProfilePopup';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import "./MyProfile.css"


export default function MyProfile() {
    const [user, setUser] = useState({});
    const [showEditProfilePopup, setShowEditProfilePopup] = useState(false);


    useEffect(() => {
      const accessToken = localStorage.getItem('accessToken');
      const fetchUser = async () => {
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` }
        };
        const { data } = await axios.get("https://capstonebe-production.up.railway.app/users/me", config);
        setUser(data);
        console.log("User Data:", data);
      };
      fetchUser();
    }, []);
  
    return (
        <div >
          <MDBContainer className="py-5 h-100" >
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="9" xl="7">
                <MDBCard id='container'>
                  <div className="rounded-top text-white d-flex flex-row">
                    <div className="ms-3 mt-1 d-flex flex-column" style={{ width: '150px' }}>
                      <MDBCardImage src={user.avatar}
                        alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />

                      <MDBBtn rounded id='editprofilebutton'
    style={{ height: '36px', overflow: 'visible' }}
    onClick={() => setShowEditProfilePopup(true)}
  >
    Edit profile
  </MDBBtn>
  <EditProfilePopup
    show={showEditProfilePopup}
    onHide={() => setShowEditProfilePopup(false)}
    user={user}
    setUser={setUser}
  />
                    </div>
                    <div className="ms-3 mt-4 ">
                      <MDBTypography className='userinfo'>{user.firstName} {user.lastName}</MDBTypography>
                      <MDBCardText>{user.city}</MDBCardText>
                    </div>
                  </div>
                  <div className="p-4 " >
                    <div className="d-flex justify-content-end text-center py-1">
                      <div>
                        <MDBCardText className="mb-1 h5">253</MDBCardText>
                        <MDBCardText className="small mb-0 yellowtext">Events Created</MDBCardText>
                      </div>
                      <div className="px-3">
                        <MDBCardText className="mb-1 h5">1026</MDBCardText>
                        <MDBCardText className="small yellowtext mb-0">Events Attended</MDBCardText>
                      </div>
                    
                    </div>
                  </div>
                  <MDBCardBody className=" p-4">
                    <div className="mb-5">
                      <p className="lead fw-normal mb-1 yellowtext">About</p>
                      <div className="p-4" >
                        <MDBCardText className="font-italic mb-1">Love some good football and a pint</MDBCardText>
                        <MDBCardText className="font-italic mb-1">Spikeball sometimes too</MDBCardText>
                        <MDBCardText className="font-italic mb-0">Please remember to unattend an event if you are not going to come</MDBCardText>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <MDBCardText className="lead fw-normal mb-0">Recent Events Attended</MDBCardText>
                    </div>
                    <MDBRow>
                      <MDBCol className="mb-2">
                        <MDBCardImage src="https://ichef.bbci.co.uk/news/976/cpsprodpb/176A4/production/_112980959_sport1.png"
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                      <MDBCol className="mb-2">
                        <MDBCardImage src="https://sportengland-production-files.s3.eu-west-2.amazonaws.com/s3fs-public/styles/max_width_1266px/public/2021-01/PA-55875259%20-%201266.jpg?VersionId=zVJoknym9gT3cgenq.BVR56G5XGZCzYX&itok=IdcoF3Ng"
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-2">
                      <MDBCol className="mb-2">
                        <MDBCardImage src="https://guardian.ng/wp-content/uploads/2019/03/sport-equipment-e1555707764770.jpeg"
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                      <MDBCol className="mb-2">
                        <MDBCardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQigGRXvo2BM-AZ9XxkUkXkdC_PfHFkoLPk9w&usqp=CAU"
                          alt="image 1" className="w-100 rounded-3" />
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      );
    }