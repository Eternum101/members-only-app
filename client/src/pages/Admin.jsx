import React, { useContext, useState } from 'react';
import axios from 'axios';
import '../styles/Form.css';
import '../styles/Admin.css'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

function Admin() {
    const [adminPasscode, setAdminPasscode] = useState('');
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/users/member', { adminPasscode });
            setUser(response.data.user);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
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
                    value={adminPasscode}
                    onChange={(e) => setAdminPasscode(e.target.value)}
                />
                </div>
            <button className="admin-submit-button" type="submit"><span>Submit </span></button>
        </form>
    </div>
    )
}

export default Admin;