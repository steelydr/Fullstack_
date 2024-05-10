import React, { useState, useEffect } from 'react';
import UserServices from '../services/UserServices';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    background: 'linear-gradient(-40deg, #a8b2c5, #8396b5, #607da5, #3d6495)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(4),
    maxWidth: 600,
    width: '100%',
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
  buttons: {
    marginTop: theme.spacing(2),
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const url = window.location.href;
        const userIdIndex = url.lastIndexOf('/') + 1;
        const userId = url.substring(userIdIndex);

        const response = await UserServices.getUserById(userId);
        setUser(response.data);
        setEditedUser(response.data);
      } catch (error) {
        setError('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user); 
  };

  const handleSave = async () => {
    try {
      const url = window.location.href;
      const userIdIndex = url.lastIndexOf('/') + 1;
      const userId = url.substring(userIdIndex);

      console.log('Edited user data:', editedUser);

      const response = await UserServices.updateUser(userId, editedUser);
      console.log('Update response:', response);

      setIsEditing(false);
      setUser(editedUser);
      Swal.fire('Success', 'User profile updated successfully', 'success');
    } catch (error) {
      Swal.fire('Error', `Error updating user: ${error}`, 'error');
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <Container className={classes.root}>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {user && (
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            User Profile
          </Typography>
          <form className={classes.form}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  value={isEditing ? editedUser.name : user.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  name="username"
                  value={isEditing ? editedUser.username : user.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  value={isEditing ? editedUser.password : '********'}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date of Birth"
                  name="datep"
                  type="date"
                  value={isEditing ? editedUser.datep : user.datep}
                  onChange={handleChange}
                  disabled={!isEditing}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={isEditing ? editedUser.email : user.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={isEditing ? editedUser.phoneNumber : user.phoneNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Gender"
                  name="gender"
                  value={isEditing ? editedUser.gender : user.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              {!isEditing && (
                <Button variant="contained" color="primary" onClick={handleEdit}>
                  Edit
                </Button>
              )}
              {isEditing && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default Homepage;