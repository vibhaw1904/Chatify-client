import React, { createContext, useState } from 'react'
import ContactsSlide from './ContactsSlide'
import './temp.css'
import { Outlet } from 'react-router-dom'
import {  UseSelector,useDispatch } from 'react-redux'

export const myContext=createContext();
function Container() {
  const dispatch=useDispatch();
  const [refresh,setRefresh]=useState(true);


  return (
    <div className='main-container'>
      <myContext.Provider value={{refresh:refresh,setRefresh:setRefresh}}><ContactsSlide/>
      <Outlet/></myContext.Provider>
      
      {/* <MessagesArea/> */}
      {/* <Welcome/> */}
      {/* <UserGroups/> */}
    </div>
  )
}

export default Container
