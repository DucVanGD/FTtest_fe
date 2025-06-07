import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getAPI } from "../../lib/restfullapi";
import { deleteCookie, getCookie } from "../../lib/cookie";
import './styles.css';

function TopBar({userId}) {
  const location = useLocation();
  const fullname = getCookie('fullname');
  const [userName, setUserName] = useState("");
  const user = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie('userId');
    deleteCookie('fullname');
    navigate('/login');
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        setUserName("");
        return;
      }
      try {
        const data = await getAPI(`user/${user.userId}`);
        setUserName(`${data.first_name}`);
      } catch (err) {
        console.error("Failed to fetch user in TopBar:", err);
        setUserName(""); 
      }
    };

    fetchUser();
  }, [userId]); 

  let appContext = "";
  if (location.pathname.includes("/users/")) {
    appContext = userName;
  } else if (location.pathname.includes("/photos")) {
    appContext = `Photos of ${userName}`;
  }

  return (
    <AppBar position="static" className="AppBar">
      <Toolbar className="Toolbar">
        <Typography variant="h6" className="Typography">
          {`Hi, ${fullname}`}
        </Typography>

        <Box className="Box">
          <Button color="error" onClick={handleLogout}>Logout</Button>
          <Typography variant="body1">
            {appContext || "Home"}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
