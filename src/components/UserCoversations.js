import React from 'react'
import  './temp.css'
const UserCoversations = ({messages,id}) => {
  return (
    <div className='message-container'>
      <p className='msg-icon'>{messages.name[0]}</p>
      <p className='name-icon'>{messages.name}</p>
      <p className='lm-icon'>{messages.lastMessage}</p>
      <p className='msg-timeStamps'>{messages.timeStamp}</p>

    </div>
  )
}

export default UserCoversations
