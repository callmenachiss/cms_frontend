import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
         <Route path="/login" element={<Login />} />
         <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App

