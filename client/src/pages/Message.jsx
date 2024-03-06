import React, { useContext, useState } from 'react';
import '../styles/Message.css';
import '../styles/Form.css';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { URL } from '../App';

function Message() {
    const { user } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${URL}/api/message`, { title, text, author: user._id });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <div className="form-wrapper">
        <div className="form-container">
            <div className='message-headings'>
                <h1 className='message-h1'>New Message</h1>
            </div>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Title:</label>
                <input 
                    className="message-input-full-width" 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
        </div>
        <div>
            <label>Message:</label>
            <textarea className='message-textarea' value={text} onChange={(e) => setText(e.target.value)}>

            </textarea>
        </div>
            <button className="message-submit-button" type="submit"><span>Submit </span></button>
        </form>
    </div>
</div>
    )
}

export default Message;