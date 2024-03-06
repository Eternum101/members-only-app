import React, { useContext, useState } from 'react';
import '../styles/Login.css';
import '../styles/Form.css';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { URL } from '../App';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`${URL}/api/users/login`, { email, password });
            const user = response.data;

            setUser(user);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Incorrect email or password. Please try again.');
            } else {
                console.error(error);
            }
        }
    };
    
    return (
    <div className="form-wrapper">
        <div className="form-container">
            <h1 className='form-header'>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input 
                        className="log-in-input-full-width" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        className='log-in-input-full-width' 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className='error-log-in'>{error}</div>}
                <button className="log-in-submit-button" type="submit"><span>Continue </span></button>
            </form>
        </div>
    </div>
    );
}

export default Login;