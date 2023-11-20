import React, { useEffect, useState } from "react";
import '../styles/Home.css'
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { FaTrashCan } from "react-icons/fa6";

function Home({ user }) {
    const [message, setMessage] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log(user);

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('/api/message');
                setTimeout(() => {
                    setMessage(response.data);
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, []);

    const deleteMessage = async(id) => {
        try {
            await axios.delete(`/api/message/${id}`);
            setMessage(message.filter((msg) => msg._id !== id));
        } catch (error) {
            console.error(error);
        }
    }

    return (
    <>
    <div className="messages-header">
        <h1>Explore <span>Messages</span></h1>
        {!user && (
            <h3>(<span>Sign</span> Up for Full Access to Messages)</h3>
        )}
    </div>
    <div className="main-container">
    {isLoading ? (
            <div className="loader"></div>
        ) : (
        message.map((message, index) => (
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
    <div className="delete-container">
    { user && user.membershipStatus === 'Admin' ? (
            <button className="btn-delete" onClick={() => deleteMessage(message._id)}>
                <FaTrashCan/>
                Delete
                </button>
        ) : null}
    </div>
    </div>
    )
))}
    </div>
    </>
    )
}

export default Home;
