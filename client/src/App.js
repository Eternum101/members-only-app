import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Member from './pages/Member';
import Message from './pages/Message';
import Admin from './pages/Admin';
import UserContext from './context/UserContext';

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const [user, setUser] = useState(null);

  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Header user={user}/>
        <Routes>
          <Route path='/' element={<Home user={user}/>} />
          <Route
            path='/sign-up'
            element={<SignUp/>}
          />
          <Route
            path='/log-in'
            element={<Login/>}
          />
          <Route
            path='/member'
            element={<Member/>}
          />
          <Route
            path='/message'
            element={<Message/>}
          />
          <Route
            path='/admin'
            element={<Admin/>}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
