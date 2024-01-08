import React from 'react'
import './temp.css'
const SendMessage = () => {
    const props={name:"kittu",message:"hey kittu this side"}
  return (
    <div className='send-message-container'>
      <div className='messageBox'>
        <p>{props.message}</p>
        <p className='send-timeStamp'>12:00 Am</p>
      </div>
    </div>
  )
}

export default SendMessage
