
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Events from './Events'

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <div className="mainContainer d-flex justify-content-center">
      <Events/>
      </div>
    </>
  )
}

export default Home