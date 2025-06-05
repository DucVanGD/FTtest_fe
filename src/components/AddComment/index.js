import React from 'react'
import { Box, Grid, Paper, IconButton, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { postAPI } from '../../lib/restfullapi'
import { getCookie } from '../../lib/cookie'

const AddComment = ({photo_id, onAddComment}) => {
    const {register, handleSubmit, reset} = useForm();
    const userId = getCookie("userId");
    const onSubmit = async (data) => {
        try{
            const commentData = {
                user_id: userId,
                comment: data.comment,
                photo_id: photo_id
            }
            const comment = await postAPI('comment', commentData);
            onAddComment(photo_id, comment);
            reset();
        } catch (e) {
            console.error("Error adding comment:", e);
            alert('Error on add comment: ',e);
        }
    } 
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{mb: 2}}>
                <Grid item xs={11}>
                    <input {...register('comment', {required: true})} />
                </Grid>
                <Grid item xs={1}>
                    <Button variant='contained' type='submit' color='primary'>Send</Button>
                </Grid>
            </Grid>
        </form>
    )
}   

export default AddComment;