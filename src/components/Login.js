import { useState } from 'react';
import Signup from './Signup';
import './Login.css'
import axios from 'axios';
import login from '../Images/login.jpg'
const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleForm = () => {
        setIsLoggedIn(!isLoggedIn)
    }
    const handleLoginSubmit = (e) => {
       
    };
    
    const handleSignupSubmit = (userData) => {
       
    }

    return (
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
                            <button type='submit'>Login</button>
                        </div>
                    </form>
                )
                : <Signup onSubmit={handleSignupSubmit} />
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
    )
}

export default Login;
