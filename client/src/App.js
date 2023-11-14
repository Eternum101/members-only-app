import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import UserContext from './context/UserContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Header user={user}/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route
            path='/sign-up'
            element={<SignUp/>}
          />
          <Route
            path='/log-in'
            element={<Login/>}
          />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;