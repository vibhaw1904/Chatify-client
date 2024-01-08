import React from 'react'
import welcome from '../Images/welcome2.jpg'
import './temp.css'
import { Link } from 'react-router-dom'
const LoginSignupContainer = () => {
  return (
    <div className='LoginSignupContainer-container'>
      <div className='heading-text'>
        <h1>Get Started</h1>
        <p>Start with signing up or sign in</p>
      </div>
      <div className='getstart-icon'>
        <img src={welcome} alt=""/>
      </div>
      <div className='welcome-btn'>
      <Link to="/login"><button>Login/Signup</button></Link>
      </div>
    </div>
  )
}

export default LoginSignupContainer
