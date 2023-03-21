import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import "./Footer.css"

export default function Footer() {
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
      <section className='mb-4'>
    
        
<div className="d-flex justify-content-around">
            <a href="twitter" class="fa fa-twitter"></a>
            <a href="facebook" class="fa fa-facebook"></a>
            <a href="instagram" class="fa fa-instagram"></a>
            <a href="linkedin" class="fa fa-linkedin"></a>
            <a href="google" class="fa fa-google"></a>
            <a href="github" class="fa fa-github"></a>
            </div>

        

        

        </section>

        <section className=''>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md='5' start>
                <MDBInput contrast type='email' label='Email address' className='mb-4' />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color='light' type='submit' className='mb-4'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        <section className='mb-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        <section className=''>
         
       



            
<div className="d-flex justify-content-around mx-4 mx-5" id='footerlinks'>
       
<div><a href='contact'>Feature Suggestion Inbox</a></div>
<div><a href='contact'>Career</a></div>

        <div><a href='contact'>Contact Page</a></div>
        </div>
        </section>
      </MDBContainer>

     
    </MDBFooter>
  );
}