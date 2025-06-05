import './App.css';

import React, {useState} from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Home from "./components/Home";
import { getCookie } from './lib/cookie';
import LoginRegister, {onLoginSuccess} from './components/LoginRegister';

const App = (props) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(getCookie('userId'));

  return (
    <Router>
      {!userId && <LoginRegister onLoginSuccess={() => setUserId(getCookie('userId'))} />}
      {userId && 
      <div>
        <Grid container spacing={2}>
            <Grid item sm={3}>
              <Paper className="main-grid-item" sx={{position: "fixed"}}>
                  <TopBar onLogout={() => setUserId(null)} />

              </Paper>
            </Grid>
            <Grid item sm={9}>
              <Paper className="main-grid-item" elevation={0}>
                  <Routes>
                      <Route path='/' element={<Home />}></Route>
                      <Route path='/users/:userId' element= {<UserDetail />}></Route>
                      <Route path='/photos/:userId' element= {<UserPhotos />}></Route>
                      <Route path='/users' element= {<UserList />}></Route>
                      <Route path='/login' element= {<LoginRegister />}></Route>
                  </Routes>
              </Paper>
            </Grid>
        </Grid>
      </div>
    }
  </Router>
  );
}

export default App;
