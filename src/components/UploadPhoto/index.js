import {Button, Paper, Stack, Typography, Avatar, IconButton, Box} from "@mui/material"
import React, {useState} from "react"
import { postAPI } from "../../lib/restfullapi"
import { getCookie } from "../../lib/cookie"

const UploadPhoto = ({onUploadPhoto}) => {
    const [file , setFile] = useState();
    const [preview, setPreview] = useState();

    const handleChange = (e) => {
        const files = e.target?.files;
        if (!files || files.length === 0) return;

        const selected = files[0];
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', file);
        formData.append('user_id', getCookie('userId'));
        try {
            const photo = await postAPI('photo', formData);
            onUploadPhoto(photo);
        } catch (e) {
            console.error("Error: ", e);
        }
    }

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
    }

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mt: 4, mx: 'auto', textAlign: 'center' }}>
        <label htmlFor="upload-photo">
            <input
            style={{ display: 'none' }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            />
            <Button variant="outlined" component="span">
            Choose Image
            </Button>
        </label>

        <Button variant="contained" onClick={handleSubmit} disabled={!file}>
            Upload
        </Button>

        {preview && (
            <Box sx={{ width: '100%', position: 'relative', mt: 2 }}>
            <Avatar
                variant="rounded"
                src={preview}
                alt="preview"
                sx={{ width: '100%', height: 'auto', borderRadius: 2 }}
            />
            <Button onClick={handleRemove} size="small">
                Remove
            </Button>
            </Box>
        )}
        </Paper>

    )
} 

export default UploadPhoto