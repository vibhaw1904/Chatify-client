import React, { useState } from 'react';
import './Signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Backdrop,CircularProgress } from '@mui/material';
const Signup = () => {
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[loading,setLoading]=useState(false)

    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        setLoading(true)

      e.preventDefault();
      await new Promise((resolve) => setTimeout(resolve, 2000));
        try {
        const res=await axios.post('http://localhost:5000/user/register',{username,email,password})
        console.log(res.data)
        localStorage.setItem('userData',JSON.stringify(res));
        navigate('/')
        } catch (error) {
            console.log(error)
        }
        
        setLoading(false)
    }

    return (<>
     <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
     <form onSubmit={handleSubmit}>
            <div className='input-field'>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="current-name" 
                    onChange={(e)=>(setUsername(e.target.value))}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="current-email" 
                    onChange={(e)=>(setEmail(e.target.value))}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autoComplete="current-password" 
                    onChange={(e)=>(setPassword(e.target.value))}
                />
               
            </div>
            <div className='signup-btn'>
                <button type="">Signup</button>
            </div>
            </form>
    
    </>
       
        
    )
}

export default Signup;
