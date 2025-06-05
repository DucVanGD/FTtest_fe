import React, { useState } from "react";
import { postAPI } from "../../lib/restfullapi";
import { useForm } from "react-hook-form";
import { setCookie } from "../../lib/cookie";
import { useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Button, TextField, Typography, Paper, Grid } from "@mui/material";

const LoginRegister = ({onLoginSuccess}) => {
  const [tabIndex, setTab] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    reset();
  };

  const onSubmit = async (data) => {
    const endpoint = tabIndex === 0 ? "auth/login" : "auth/register";
    try {
        console.log("Form data:", data);
      const user = await postAPI(endpoint, data);
      if (user) {
        setCookie("userId", user._id, 0.5);
        setCookie("fullname", `${user.first_name} ${user.last_name}`, 0.5);
        onLoginSuccess?.();
        navigate(`/user/${user._id}`);
        reset();
      }
    } catch (err) {
      console.error("Error:", err);
      const errorMsg = err.response?.data?.error || err.response?.data?.message || "Something went wrong.";
      alert(errorMsg);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={3}>
          {tabIndex === 0 && (
            <Box>
              <TextField
                label="Login Name"
                fullWidth
                margin="normal"
                {...register("login_name")}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register("password")}
              />
            </Box>
          )}

          {tabIndex === 1 && (
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Register
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="First Name" fullWidth {...register("first_name")} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Last Name" fullWidth {...register("last_name")} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Location" fullWidth {...register("location")} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Occupation" fullWidth {...register("occupation")} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Description" fullWidth {...register("description")} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Login Name" fullWidth {...register("login_name")} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Password" type="password" fullWidth {...register("password")} />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="Confirm Password" type="password" name='comfirm_pw' fullWidth {...register("confirm_pw", { required: true }) } />
                </Grid>
              </Grid>
            </Box>
          )}

          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            {tabIndex === 0 ? "Login" : "Register Me"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginRegister;
