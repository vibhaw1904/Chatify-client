import { IconButton } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './temp.css';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence,motion } from 'framer-motion';
import { useEffect,useState } from 'react';
import axios from 'axios';
const UserGroups = () => {
  
  const navigate=useNavigate();
   const userData = JSON.parse(localStorage.getItem("userData"));
  const user=userData.data
  const [users,setUsers]=useState([]);

useEffect(()=>{
  axios.get('https://chatify-backend-1w3m.onrender.com/user/fetchUsers',{
    headers:{
      Authorization:`Bearer ${user.token}`
    }
  })
  .then((res)=>{
    setUsers(res.data);
    console.log(res.data)
  })
},[user.token])
  return (
    <AnimatePresence>
         <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          ease: "anticipate",
          duration: "0.3",
        }}
        className="list-container"
      >
   
      <div className='ug-header'>
        <p>Available Users</p>
      </div>
      <div className='sb-search'>
        <IconButton>
            <SearchIcon/>
        </IconButton>
        <input  placeholder='Search' className='search-input' defaultValue=""/>
      </div>
      <div className='ug-list'>

      {
        users.map((ele,index)=>{
          return(
            <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={"list-tem" }
            key={index}
            onClick={() => {
              console.log("Creating chat with ", ele.username);
              const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              };
              axios.post(
                "https://chatify-backend-1w3m.onrender.com/chat/",
                {
                  userId: ele._id,
                },
                config
              );
              ;
            }}
          >
            <div className='list-item'>
            <p className='msg-icon'>{ele.username[0]}</p>
            <p className='name-icon'>{ele.username}</p>
           </div>
           </motion.div>

          )
        
        })
      }
       
       
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default UserGroups
