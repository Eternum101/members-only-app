import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';
import '../styles/Admin.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { URL } from '../App';

function Admin() {
    const [adminPasscode, setAdminPasscode] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${URL}/api/users/member`, { adminPasscode });
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.error(error);
            setError('Incorrect password. Please try again.');
        }
    };

    return (
    <div className="form-wrapper">
        <div className="form-container">
            <div className='admin-headings'>
                <h1>Admin Privileges</h1>
                <h3 className='admin-spacing'>Enter the Correct Password to Acquire Admin Status</h3>
            </div>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Password:</label>
                <input 
                    className='admin-input-full-width' 
                    type="password"
                    required
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                />
                </div>
                {error && <div className='error-log-in'>{error}</div>}
            <button className="admin-submit-button" type="submit"><span>Submit </span></button>
        </form>
    </div>
</div>
    )
}

export default Admin;