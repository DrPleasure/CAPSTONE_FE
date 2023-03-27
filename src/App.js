import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home';
import Events from './components/Events';
import Register from './components/Register';
import SingleEvent from './components/SingleEvent';
import MyProfile from './components/MyProfile';
import Profile from "./components/Profile.jsx"

// add weather forecast??

function App() {
  return (
  <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route exact path="/events/:id" element={<SingleEvent/>} />
        <Route exact path="/profile" element={<MyProfile/>} />
        <Route exact path="/profile/:id" element={<Profile/>} />

      </Routes>
    </Router>
  )
}

export default App;
