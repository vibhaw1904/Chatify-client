import React from 'react'
import  './temp.css'
import { useNavigate } from 'react-router-dom'
const UserCoversations = ({messages,id}) => {
  const navigate=useNavigate();
  return (
    <div className='conversation-container' onClick={()=>{
      navigate('message')
    }}>
      <p className='msg-icon'>p</p>
      <p className='name-icon'>{messages.name}</p>
      <p className='lm-icon'>{messages.lastMessage}</p>
      <p className='msg-timeStamps'>{messages.timeStamp}</p>

    </div>
  )
}

export default UserCoversations
