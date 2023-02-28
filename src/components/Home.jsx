
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Events from './Events'
import Footer from './Footer'
import Navbartop from './Navbartop'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])

  return (
    <>
    <div>
        <Navbartop/>
    </div>
      <div className="mainContainer d-flex justify-content-center">
      <Events/>
      </div>
      <div>
      <Footer/>
      </div>
    </>
  )
}

export default Home