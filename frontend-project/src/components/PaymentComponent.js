import React, { useState, useEffect } from 'react';
import PaymentService from '../services/PaymentService';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Select, MenuItem, Button, FormControl, InputLabel, Grid } from '@material-ui/core';
import swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: 'linear-gradient(-40deg, #a8b2c5, #8396b5, #607da5, #3d6495)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  form: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(4),
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    color: '#333333',
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  label: {
    color: '#555555',
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  select: {
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    '&:focus': {
      backgroundColor: '#ffffff',
    },
  },
  button: {
    backgroundColor: '#3d6495',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#2c4c75',
    },
    marginTop: theme.spacing(2),
  },
}));

const PaymentComponent = () => {
  const classes = useStyles();
  const [userId, setUserId] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [payment, setPayment] = useState({
    bookingId: null,
    userId: null,
    paymentDate: null,
    paymentTime: null,
    paymentType: '',
    amount: 0,
    paymentStatus: 'DENIED', // Defaulting to 'DENIED'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Parse URL to extract user ID and booking ID
    const urlParts = window.location.href.split('/');
    const userIdIndex = urlParts.indexOf('user') + 1;
    const bookingIdIndex = urlParts.length - 1; // Get the last index of the array
    if (userIdIndex > 0 && userIdIndex < urlParts.length && bookingIdIndex > 0 && bookingIdIndex < urlParts.length) {
      const userIdFromUrl = parseInt(urlParts[userIdIndex], 10);
      const bookingIdFromUrl = parseInt(urlParts[bookingIdIndex], 10);
      setUserId(userIdFromUrl);
      setBookingId(bookingIdFromUrl);
      setPayment((prevPayment) => ({
        ...prevPayment,
        userId: userIdFromUrl,
        bookingId: bookingIdFromUrl,
      }));
    } else {
      // Handle invalid URL
      // For example, redirect to an error page
      console.error('Invalid URL');
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayment({ ...payment, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!payment.paymentType) {
      errors.paymentType = 'Payment type is required.';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const savePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      swal.fire('Error', errors.paymentType, 'error');
      return;
    }

    // Get current date and time
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const currentTimeString = currentDate.toTimeString().split(' ')[0]; // Format: HH:MM:SS

    try {
      // Set payment object with current date and time
      const updatedPayment = {
        ...payment,
        paymentDate: currentDateString,
        paymentTime: currentTimeString,
      };

      const response = await PaymentService.createPayment(updatedPayment);
      console.log(response.data);
      swal.fire('Success', 'Payment Successfully Added', 'success');
    } catch (error) {
      swal.fire('Error', 'An error occurred while adding payment. Please try again.', 'error');
      console.log(error);
    }
  };

  const paymentTypes = [1, 2, 3, 4];

  return (
    <Box className={classes.container}>
      <form className={classes.form} onSubmit={savePayment}>
        <Typography variant="h5" className={classes.title}>
          Add Payment
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
              <InputLabel className={classes.label} id="paymentType-label">
                Payment Type
              </InputLabel>
              <Select
                id="paymentType"
                name="paymentType"
                value={payment.paymentType}
                onChange={handleInputChange}
                label="Payment Type"
                className={classes.select}
                required
              >
                <MenuItem value="">Select Payment Type</MenuItem>
                {paymentTypes.map((type, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.paymentType && <span className="error">{errors.paymentType}</span>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl} fullWidth>
              <InputLabel className={classes.label} id="paymentStatus-label">
                Payment Status
              </InputLabel>
              <Select
                id="paymentStatus"
                name="paymentStatus"
                value={payment.paymentStatus}
                onChange={handleInputChange}
                label="Payment Status"
                className={classes.select}
              >
                <MenuItem value="DENIED">Denied</MenuItem>
                <MenuItem value="ACCEPTED">Accepted</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disableElevation
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PaymentComponent;