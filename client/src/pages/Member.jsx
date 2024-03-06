import React, { useContext, useState } from 'react';
import '../styles/Member.css';
import '../styles/Form.css';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { URL } from '../App';

function Member() {
    const { setUser } = useContext(UserContext);
    const [passcode, setPasscode] = useState(''); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`${URL}/api/users/member`, { passcode });
            const { user } = response.data;

            setUser(user);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Incorrect passcode. Please try again.'); // Update the error message
            } else {
                console.error(error);
            }
        }
    };

    return (
    <div className="form-wrapper">
         <div className="content-container">
        <div className="form-container">
            <div className='member-headings'>
                <h1>Become a Member</h1>
                <h3>Enter the Correct Passcord to Acquire Member Status</h3>
                <h3>(Look for a Hint.)</h3>
            </div>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Passcode:</label>
                <input 
                    className='member-input-full-width' 
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)} 
                />
                </div>
            {error && <div className='error-log-in'>{error}</div>}
            <button className="member-submit-button" type="submit"><span>Submit </span></button>
        </form>
    </div>
    <div className='hidden-passcode'>
        <h3>Passcode: member101</h3>
    </div>
    </div>
</div>
    )
}

export default Member;