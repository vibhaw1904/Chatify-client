import React from 'react'
import welcome3 from '../Images/welcome3.jpg'
const Welcome = () => {
  const userData=JSON.parse(localStorage.getItem('userData'))
  return (
    <div className='welcome'>
      <img src={welcome3} alt=""/>
      <b>hi {userData.data.username}</b>
      <p>View and text directly to people present in the chat Rooms</p>
    </div>
  )
}

export default Welcome;
