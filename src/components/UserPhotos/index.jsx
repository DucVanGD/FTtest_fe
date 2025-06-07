import React, { useEffect, useState } from "react";
import {
  Grid, List, ListItem, ListItemText, Typography,
  Box, Avatar, Button, Divider
} from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import UploadPhoto from "../UploadPhoto";
import AddComment from "../AddComment";
import { getCookie } from "../../lib/cookie";
import { getAPI } from "../../lib/restfullapi";

function UserPhotos() {
  const user = useParams();
  const [photoOfUser, setPhotoOfUser] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  const handleUploadPhoto = (photo) => {
    setPhotoOfUser(prev => [...prev, photo]);
  };

  const handleAddComment = (photoId, comment) => {
    setPhotoOfUser(prev =>
      prev.map(photo =>
        photo._id === photoId
          ? { ...photo, comments: [...photo.comments, comment] }
          : photo
      )
    );
  };

  useEffect(() => {
    async function fetchPhoto() {
      const userId = user.userId;
      const data = await getAPI(`photo/${userId}`);
      setPhotoOfUser(Array.isArray(data) ? data : []);
      console.log(photoOfUser);
    }
    fetchPhoto();
  }, [user.userId]);


  useEffect(() => {
    async function fetchImages() {
      const urls = {};
      for (const photo of photoOfUser) {
        try {
          const res = await fetch(`http://localhost:8081/api/images/${photo.file_name}`);
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          urls[photo._id] = url;
        } catch (err) {
          console.error(`Lỗi tải ảnh ${photo.file_name}`, err);
        }
      }
      setImageUrls(urls);
    }
    if (photoOfUser.length > 0) fetchImages();
  }, [photoOfUser]);

  useEffect(() => {
    console.log("photoOfUser đã được cập nhật:", photoOfUser);
  }, [photoOfUser]);

  return (
    <Box sx={{ ml: '10px', pr: 2 }}>
      {user.userId === getCookie("userId") && <UploadPhoto onUploadPhoto={handleUploadPhoto} />}
      {photoOfUser.length > 0 ? (
        photoOfUser.map(photo => (
          <Box
            key={photo._id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: 2,
              mb: 3,
              backgroundColor: '#fdfdfd'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">
                    {photo?.user_id?.first_name} {photo?.user_id?.last_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Time: {new Date(photo.date_time).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center', 
                  width: '100%',
                }}
              >
                <img
                  src={imageUrls[photo._id]}
                  alt={photo.file_name}
                  style={{
                    width: 'auto',
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '6px',
                    display: 'block',
                  }}
                  loading="lazy"
                />
              </Box>
            </Grid>
              
              <Grid item xs={12}>
                <List component="nav">
                  {photo?.comments.length > 0 &&
                    photo.comments.map((comment) => (
                      <Box
                        key={comment._id}
                        sx={{
                          border: '1px solid lightgray',
                          borderRadius: '4px',
                          padding: '8px',
                          marginBottom: '8px',
                          backgroundColor: '#f9f9f9',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              alt={`${comment?.user_id?.first_name} ${comment?.user_id?.last_name}`}
                              src={`/images/${comment?.user_id?.avatar}`}
                              sx={{ width: 24, height: 24, marginRight: 1 }}
                            />
                            <Typography variant="body1">
                              {comment?.user_id?.first_name} {comment?.user_id?.last_name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(comment.date_time).toLocaleString('vi-VN')}
                          </Typography>
                        </Box>
                        <ListItem>
                          <ListItemText primary={comment?.comment} />
                        </ListItem>
                      </Box>
                    ))}
                </List>
              </Grid>
              {photo?.comments.length > 2 && (
                <Grid item xs={12}>
                  <Button>More...</Button>
                </Grid>
              )}

              <Grid item xs={12}>
                <AddComment photo_id={photo._id} onAddComment={handleAddComment} />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ margin: '20px 0' }} />
              </Grid>
            </Grid>
          </Box>
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>No photos available.</Typography>
      )}
    </Box>
  );
}

export default UserPhotos;
