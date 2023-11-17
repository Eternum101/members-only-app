import React, { useEffect, useState, useContext } from "react";
import '../styles/Home.css'
import axios from "axios";

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
    <div className="main-container">
    <div className="messages-header">
            <h1>Explore <span>Messages</span></h1>
            {!user && (
                <h3>(<span>Sign</span> Up for Full Access to Messages)</h3>
            )}
        </div>
        <div className="messages-container">
    {message.map((message, index) => (
        <div key={index}>
            <h3>{message.title}</h3>
            { user && user.membershipStatus === 'Member' ? (
                <>
                <p>by {message.author.firstName}</p>
                <p>{message.timestamp}</p>
                </>
            ) : null}
            <p>{message.text}</p>
        </div>
    ))}
</div>
    </div>
    </>
    )
}

export default Home;