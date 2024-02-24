import { useState } from 'react';
import Signup from './Signup';
import './Login.css'
import axios from 'axios';
import login from '../Images/login.jpg'
import { useNavigate } from 'react-router-dom';
import { Backdrop,CircularProgress } from '@mui/material';
const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[loading,setLoading]=useState(false)
    const [loginStatus,setLoginStatus]=useState(false)
    const navigate=useNavigate();
    const toggleForm = () => {
        setIsLoggedIn(!isLoggedIn)
    }

    

    const handleLoginSubmit = async(e) => {
        setLoading(true)
       e.preventDefault();

       await new Promise((resolve) => setTimeout(resolve, 2000));
       try {
        const res= await axios.post('https://chatify-backend-1w3m.onrender.com/user/login',{email,password},{
        headers:{
            'Content-Type':'application/json'
        }
       });
       const token=res.data.token;
       localStorage.setItem('token',token);
       console.log(res.data);
       setLoginStatus({ msg: "Success", key: Math.random() });

       setLoading(false);
       localStorage.setItem("userData", JSON.stringify(res));

    //    const token=await res.data.token;
    //    localStorage.setItem('token',token);
       navigate('/dashboard/welcome');
       } catch (error) {
        setLoginStatus({
            msg: "Invalid User name or Password",
            key: Math.random(),
          });
       }
      setLoading(false);
    };
    
   

    return (
        <>
         <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
         <div className="main-card">
             <div className='login-img'>
                                            <img src={login} alt=""/>

                    </div>

            {isLoggedIn
                ? (
                   
                    <form className="login-form" action="" onSubmit={handleLoginSubmit}>
                        <div className='input-field'>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                autoComplete="current-email" 
                                onChange={(e) => (setEmail(e.target.value))}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                autoComplete="current-password" 
                                onChange={(e) => (setPassword(e.target.value))}
                            />
                        </div>
                        <div className='login-btn'>
                            <button type='submit'>{loading ?<CircularProgress size={24} color="inherit"/>:'Login'}</button>
                        </div>
                    </form>
                )
                : <Signup  />
            }
            <p>
                {isLoggedIn
                    ? "Haven't registered yet? "
                    : 'Already have an account? '}
                <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'blue' }}>
                    {isLoggedIn ? 'Register here' : 'Login here'}
                </span>
            </p>
        </div>
        </>
       
    )
}

export default Login;
