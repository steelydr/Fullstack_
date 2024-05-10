import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Box, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', 
    backgroundImage: 'linear-gradient(-40deg, #a8b2c5, #8396b5, #607da5, #3d6495)', 
    animation: '$gradientAnimation 10s ease-in-out infinite', 
    position: 'relative', 
    overflow: 'hidden', 
  },
  card: {
    width: '300px',
    padding: theme.spacing(4),
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  formGroup: {
    marginBottom: theme.spacing(3),
  },
  label: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  input: {
    width: '100%',
  },
  button: {
    backgroundColor: '#0077b6',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#005b8f',
    },
  },
  '@keyframes gradientAnimation': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
}));

const Bookingspree = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/demo');
        setData(response.data);
        console.table(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        Swal.fire('Error', 'An error occurred while fetching data', 'error');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isValidCredentials = data.some(
        (item) => item.USERNAMES === username && item.PASSWORDS === password
      );

      if (isValidCredentials) {
        let userResponse;
        userResponse = await axios.get(`http://localhost:3002/${username}`);

        if (userResponse.status === 200) {
          const userId = userResponse.data.userid;

          console.log('User ID:', userId);
          Swal.fire('Success', 'Login successful!', 'success').then(() => {
            navigate(`/user/${userId}/home`);
          });
        } else {
          Swal.fire('Error', 'User not found', 'error');
        }
      } else {
        // Login failed, display an error message
        Swal.fire('Error', 'Invalid username or password', 'error');
      }
    } catch (err) {
      try {
        const isValidCredentials = data.some(
          (item) => item.USERNAMES === username && item.PASSWORDS === password
        );

        if (isValidCredentials) {
          let adminResponse;

          adminResponse = await axios.get(`http://localhost:3002/a/${username}`);

          if (adminResponse.status === 200) {
            const adminId = adminResponse.data.adminid;
            const roleId = adminResponse.data.roleid;
            console.log('Admin ID:', adminId);
            console.log('Role ID:', roleId);
            Swal.fire('Success', 'Admin Login successful!', 'success').then(() => {
              navigate(`/admin/${adminId}/${roleId}`);
            });
          } else {
            console.error('Error logging in:', err);
            Swal.fire('Error', 'An error occurred while logging in', 'error');
          }
        }
      } catch (err) {
        console.error('Error logging in:', err);
        Swal.fire('Error', 'An error occurred while logging in', 'error');
      }
    }
  };

  return (
    <Box className={classes.container}>
      <Fade in timeout={600}>
        <Box className={classes.card}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <Box className={classes.formGroup}>
              <Typography variant="body1" className={classes.label}>
                Username
              </Typography>
              <TextField
                className={classes.input}
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter Username"
                required
              />
            </Box>
            <Box className={classes.formGroup}>
              <Typography variant="body1" className={classes.label}>
                Password
              </Typography>
              <TextField
                className={classes.input}
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
                required
              />
            </Box>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Box>
      </Fade>
    </Box>
  );
};

export default Bookingspree;