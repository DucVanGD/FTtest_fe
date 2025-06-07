import React, { useEffect, useState } from "react";
import {ImageListItem, List, ListItem, ListItemText, Typography, Box} from "@mui/material";

import {Link, useParams} from "react-router-dom";
import {getAPI, postAPI} from "../../lib/restfullapi";
import TopBar from "../TopBar";


function UserDetail() {
    const user = useParams();
    const [userData, setUserData] = useState(null);
    const [userPhotos, setUserPhotos] = useState([]);

    useEffect(() => {
      const fetchUser = async () => {
        const userId = user.userId;
        console.log(userId);
        if (!userId) return;
        try {
          const userById = await getAPI(`user/${userId}`);
          setUserData(userById);

          const photoByUser = await getAPI(`photo/${userId}`);
          setUserPhotos(photoByUser);
        } catch (err) {
          console.error("Error fetching user or photos:", err);
        }
      };

      fetchUser();
    }, [user.userId]);

    return (
        <>
          <Box sx=  {{
            width: '70%',
            margin: '0 auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '10px',
            }}>
            <Box sx={{ maxWidth: 600, width: '100%' }}>
            <Typography variant="body1" component="div" sx={{ width: '100%' }} >
              <List component="nav">
                <ListItem>
                  <ListItemText primary={`Full name: ${userData?.first_name} ${userData?.last_name}`}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Location: ${userData?.location}`}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Occupation: ${userData?.occupation}`}/>
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Description: ${userData?.description}`}/>
                </ListItem>
                <ListItem>
                  <Link to = {`/photos/${user.userId}`} state={{ userId: user.userId }} >View all Photos</Link>
                </ListItem>
              </List>
              
            </Typography>
            </Box>
          </Box>
        </>
    );
}

export default UserDetail;
