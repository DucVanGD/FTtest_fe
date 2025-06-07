import React, {useState, useEffect} from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";

import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData"
import { getCookie } from "../../lib/cookie";
import { getAPI } from "../../lib/restfullapi";

function UserList () {
    const [users, setUsers] = useState([])
    useEffect(()=>{
      const fetchUser = async ()=>{
        let data = await getAPI('user/list');
        //data = data.filter((item) => item._id !== getCookie("userId")) 
        setUsers(data)
      }
      fetchUser()
    }, [])

    return (
      <Box
        sx={{
          width: '70%',
          margin: '0 auto',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginLeft: '10px',
        }}
      >
        <List component="nav" sx={{ width: '100%' }}>
          {users && users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem>
                <Link to={`/users/${item._id}`} state={{ userId: item._id }} style={{ textDecoration: 'none', width: '100%' }}>
                  <ListItemText primary={`${item.first_name} ${item.last_name}`}/>
                </Link>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
}

export default UserList;
