import React from 'react'
import './temp.css'
const RecieveMessage = () => {
    const props={name:"vibhaw",message:"hhey vibhaw  this side"}
  return (
    <div className='Recieve-message-container'>
      <div className='conversation-container'>
        <p className='msg-icon'>{props.name[0]}</p>
        <div className='other-text-content'>
        <p className="name-icon">{props.name}</p>
          <p className="lm-icon">{props.message}</p>
          <p className='self-timeStamp'>12:00 AM</p>
        </div>

      </div>
    </div>
  )
}

export default RecieveMessage
