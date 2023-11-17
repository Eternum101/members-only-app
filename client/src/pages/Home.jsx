import React, { useEffect, useState } from "react";
import '../styles/Home.css'
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

function Home({ user }) {
    const [message, setMessage] = useState([]);
    console.log(user);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('/api/message');
                setMessage(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, []);

    return (
    <>
    <div className="messages-header">
        <h1>Explore <span>Messages</span></h1>
        {!user && (
            <h3>(<span>Sign</span> Up for Full Access to Messages)</h3>
        )}
    </div>
    <div className="main-container">
        {message.map((message, index) => (
    <div key={index} className="messages-container">
        <div className="title-container">
            <h3>{message.title}</h3>
            { user && (user.membershipStatus === 'Member' || user.membershipStatus === 'Admin') ? (
                <div className="timestamp">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                </div>
            ) : null}
        </div>
        { user && (user.membershipStatus === 'Member' || user.membershipStatus === 'Admin') ? (
        <p>by {message.author.firstName}</p>
        ) : null}
        <p>{message.text}</p>
    </div>
))}
    </div>
    </>
    )
}

export default Home;
