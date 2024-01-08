import React from 'react'
import ContactsSlide from './ContactsSlide'
import MessagesArea from './MessagesArea'
import './temp.css'
function Container() {
  return (
    <div className='main-container'>
      <ContactsSlide/>
      <MessagesArea/>
    </div>
  )
}

export default Container
