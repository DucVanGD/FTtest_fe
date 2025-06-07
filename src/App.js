import './App.css';

import React, { useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Home from "./components/Home";
import { getCookie } from './lib/cookie';
import LoginRegister from './components/LoginRegister';

const App = () => {
  const [userId, setUserId] = useState(getCookie('userId'));

  return (
    <Router>
      {!userId && <LoginRegister onLoginSuccess={() => setUserId(getCookie('userId'))} />}
      {userId && (
        <Box>
          <TopBar userId={userId} />

          <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
            <Box sx={{ width: '20%', borderRight: '1px solid #ddd', p: 2, overflowY: 'auto' }}>
              <UserList />
            </Box>

            <Box sx={{ width: '80%', p: 2, overflowY: 'auto' }}>
              <Routes>
                <Route path="/users/:userId" element={<UserDetail />} />
                <Route path="/photos/:userId" element={<UserPhotos />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/login" element={<LoginRegister  onLoginSuccess={() => setUserId(getCookie('userId'))}/>}/>
              </Routes>
            </Box>
          </Box>
        </Box>
      )}
    </Router>
  );
}

export default App;
