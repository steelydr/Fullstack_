import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserServices from '../services/UserServices';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(-40deg, #a8b2c5, #8396b5, #607da5, #3d6495)',
    animation: 'gradientAnimation 10s ease-in-out infinite',
    WebkitAnimation: 'gradientAnimation 10s ease-in-out infinite',
    position: 'relative',
    overflow: 'hidden',
  },
  card: {
    padding: theme.spacing(4),
    backgroundColor: '#fff',
    borderRadius: 8,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 500,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    backgroundColor: '#0d47a1',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#0a3a84',
    },
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#c62828',
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
    '@-webkit-keyframes gradientAnimation': {
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

const AddUserComponent = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [ddate, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const navigate = useNavigate();
  const classes = useStyles();

  
  const saveUser = (e) => {
    e.preventDefault();
    if (!name) {
      window.alert("Name field is required.");
      return;
    } else if (!username) {
      window.alert("Username field is required.");
      return;
    } else if (!ddate) {
      window.alert("Date field is required.");
      return;
    } else if (!email) {
      window.alert("Email field is required.");
      return;
    } else if (!password) {
      window.alert("Password field is required.");
      return;
    } else if (!phonenumber) {
      window.alert("Phone number field is required.");
      return;
    } else if (!gender) {
      window.alert("Gender field is required.");
      return;
    }
  
    // Additional validation for username
    const usernameRegex = /^[A-Za-z0-9_]+$/; // Username should be in combination of letters, numbers, and underscore
    if (!usernameRegex.test(username)) {
      window.alert("Username should contain only letters, numbers, and underscore.");
      return;
    }
  
    // Additional validation for password
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Password should have at least one digit, one lowercase, one uppercase, one special character and minimum length of 8 characters
    if (!passwordRegex.test(password)) {
      window.alert("Password should contain at least one digit, one lowercase letter, one uppercase letter, one special character, and minimum length of 8 characters.");
      return;
    }
  
    // Additional validation for email
    const emailRegex = /^[^\s@]+@gmail\.com$/; // Email should end with @gmail.com
    if (!emailRegex.test(email)) {
      window.alert("Email should end with @gmail.com.");
      return;
    }
  
    const user = { 
      name: name,
      username: username,
      datep: ddate, 
      email: email,
      password: password,
      phoneNumber: phonenumber, 
      gender: gender 
    };
  
    UserServices.createUser(user)
      .then((response) => {
        console.log(response.data);
        const userId = response.data.userId;
        window.alert("User Successfully Registered");
        navigate('/user/' + userId);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setUsernameError("Username already exists.");
        } else {
          window.alert("An error occurred. Please enter the details correctly");
          console.log(error);
        }
      });
  };
  return (
    <div className={classes.root}>
      <div className={classes.card}>
        <h3 className="text-center">Registration</h3>
        <form>
          <TextField
            className={classes.textField}
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameError('');
            }}
            error={!!usernameError}
            helperText={usernameError}
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Date"
            variant="outlined"
            type="date"
            value={ddate}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            className={classes.textField}
            label="Phone Number"
            variant="outlined"
            value={phonenumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
          />
          <FormControl className={classes.textField} variant="outlined" fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <div className="btn-container">
            <Button
              className={`${classes.textField} ${classes.submitButton}`}
              variant="contained"
              onClick={saveUser}
            >
              Submit
            </Button>
            
            <Button
            variant="contained"
            className={`${classes.textField} ${classes.cancelButton}`}
            onClick={() => window.location.reload()}
            >
            Cancel
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserComponent;