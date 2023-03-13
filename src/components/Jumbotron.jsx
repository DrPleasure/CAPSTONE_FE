import React, { useState } from 'react';
import "./Jumbotron.css"
import jumboimage from "../assets/jumbo.png"

export default function Jumbotron() {
    const [showBasic, setShowBasic] = useState(false);

    return (
        <div className='jumbotron'
        style={{
          backgroundImage: `url(${jumboimage})`,
          height: '500px',
          width: '100%',
          backgroundSize: 'contain',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
        >
      <header>
    
 
<div className="d-flex justify-content-center col-12">
        <div className='p-5 text-center bg-image col-6'>
          <h1>1</h1>
         
          
        
          </div>
          <div className='col-6'>
            <h1>Throw the ball human</h1>
          </div>
          </div>
      </header>
      </div>
    );
  }