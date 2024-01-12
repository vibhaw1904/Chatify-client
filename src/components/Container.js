import React from 'react'
import ContactsSlide from './ContactsSlide'
// import MessagesArea from './MessagesArea'
import './temp.css'
import Welcome from './Welcome'
function Container() {
  return (
    <div className='main-container'>
      <ContactsSlide/>
      {/* <MessagesArea/> */}
      <Welcome/>
    </div>
  )
}

export default Container
