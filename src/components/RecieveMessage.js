import React from 'react'
import './temp.css'
const RecieveMessage = ({props}) => {
  return (
    <div className='Recieve-message-container'>
      <div className='conversation-container'>
        <p className='msg-icon'>{props.sender.username[0]}</p>
        <div className='other-text-content'>
        <p className="name-icon">{props.sender.username}</p>
          <p className="lm-icon">{props.content}</p>
          <p className='self-timeStamp'>12:00 AM</p>
        </div>

      </div>
    </div>
  )
}

export default RecieveMessage
