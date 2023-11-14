import React from "react";
import '../styles/Home.css'
import { Link } from "react-router-dom";

function Home() {
    return (
    <>
    <div className="main-container">
    <div className="messages-header">
            <h1>Explore <span>Messages</span></h1>
            <h3>(<span>Sign</span> Up for Full Access to Messages)</h3>
        </div>
        <div className="messages-container">
            <h3>Hi</h3>
            <h3>This is a test message</h3>
        </div>
    </div>
    </>
    )
}

export default Home;