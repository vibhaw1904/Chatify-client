import React from 'react'
import './temp.css'
const SendMessage = ({props}) => {
  return (
    <div className='send-message-container'>
      <div className='messageBox'>
        <p>{props.content}</p>
        <p className='send-timeStamp'>12:00 Am</p>
      </div>
    </div>
  )
}

export default SendMessage
