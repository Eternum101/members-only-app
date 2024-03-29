import React, { useContext } from "react";
import '../styles/Header.css';
import { FaPenToSquare, FaArrowRightToBracket, FaArrowRightFromBracket, FaPlus, FaUserPlus, FaUserShield } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import axios from "axios"; 
import UserContext from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import { URL } from '../App';

function Header({ user }) {

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get(`${URL}/api/users/logout`);
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }; 

    return(
        <header>
            <nav>
                <div className="logo">
                        <Link to='/'>
                        <h1>Members<span>Only.</span></h1>
                        </Link>
                </div>
            <div className="nav-right">
            {user ? (
            <>
            <h4>
                {user.firstName}
            </h4>
            {(user.membershipStatus === 'Member' || user.membershipStatus === 'Admin') && (
                <Link to='/message'>
                    <button className="btn-message">
                        <FaPlus/>
                        New <span>Message</span> 
                    </button> 
                </Link>
            )}
            {user.membershipStatus === 'Member' && (
                <Link to='/admin'>
                    <button className="btn-admin">
                        <FaUserShield/>
                        Admin<span></span> 
                    </button>
                </Link>
            )}
            {user.membershipStatus !== 'Member' && user.membershipStatus !== 'Admin' && (
                <>
                    <Link to='/member'>
                        <button className="btn-member">
                            <FaUserPlus/>
                            Become A<span>Member</span> 
                        </button>
                    </Link>
                    <Link to='/admin'>
                        <button className="btn-admin">
                            <FaUserShield/>
                            Admin<span></span> 
                        </button>
                    </Link>
                </>
            )}
            <button className="btn-log-in" onClick={handleLogout}>
                <FaArrowRightFromBracket/>
                Log Out
            </button>
        </>
    ) : (
        <>
            <Link to ='/sign-up'>
            <button className="btn-sign-up">
                <FaPenToSquare/>
                Sign Up
            </button>
            </Link>
            <Link to='/log-in'>
            <button className="btn-log-in">
                <FaArrowRightToBracket/>
                Log In
            </button>
            </Link>
        </>
    )}
</div>
</nav>
</header>
    )
}

export default Header;
