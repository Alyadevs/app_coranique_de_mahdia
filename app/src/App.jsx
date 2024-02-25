import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Home from './Pages/Home'
import SignUpUser from './Pages/SignUpUser'

function App() {
  

  return (
    <>
      <div>
      <Router>
      <div>
    
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<SignUp/>} />
        <Route exact path="/registeruser" element={<SignUpUser/>} />
        </Routes>
    
      
 
  </div>
    </Router>
       </div>
    </>
  )
}

export default App
