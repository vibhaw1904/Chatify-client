import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import './temp.css';
import { IconButton } from '@mui/material';
import UserCoversations from './UserCoversations';
const ContactsSlide = () => {
const[messages,setMessages]=useState([{
    name:"test1",
    lastMessage:"xyz",
    timeStamp:"today"
},
{
    name:"test2",
    lastMessage:"xyz",
    timeStamp:"today"
},
{
    name:"test3",
    lastMessage:"xyz",
    timeStamp:"today"
},
])
  return (
    <div className='contactSlide-container'>
      <div className='headers'>
        <div>
        <IconButton>
        <AccountCircleIcon/>
        </IconButton> 
        </div>
       <div>
       <IconButton>
        <PersonAddAltIcon/>
        </IconButton> <IconButton>
        <GroupAddIcon/>
        </IconButton> <IconButton>
        <AddCircleIcon/>
        </IconButton> <IconButton>
        <DarkModeIcon/>
        </IconButton>
       </div>
      
      </div>
      <div className='Search'>
        <IconButton>        <SearchIcon/>
</IconButton>
        <input type="text" placeholder='search...' />
      </div>
      <div className='contacts'>
       { messages.map((elem,index)=>{
            return  <UserCoversations key={index} messages={elem}/>
        })}
       
      </div>
    </div>
  )
}

export default ContactsSlide
