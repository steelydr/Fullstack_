import React, { useState, useEffect } from 'react';
import ConcertServices from '../services/ConcertServices';
import BookingServices from '../services/BookingServices';
import { Typography, Box, Card, CardContent, Button, Select, MenuItem, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: 'linear-gradient(-40deg, #a8b2c5, #8396b5, #607da5, #3d6495)',
    color: '#e5e5e5',
    padding: theme.spacing(4),
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#ff6b6b',
    marginBottom: theme.spacing(2),
  },
  concertDetails: {
    backgroundColor: '#fff', 
    color: '#333333', // Dark text color
    padding: theme.spacing(3),
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    color: '#3d6495', // Dark blue color from the background gradient
    marginBottom: theme.spacing(2),
  },
  label: {
    color: '#333333', // Dark text color
    marginRight: theme.spacing(1),
  },
  select: {
    backgroundColor: '#ffffff', // White background color
    color: '#333333', // Dark text color
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: '#3d6495', // Dark blue color from the background gradient
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#2c4c75', // Darker blue on hover
    },
    marginTop: theme.spacing(2),
  },
}));


const Concerts = () => {
  const classes = useStyles();
  const [concert, setConcert] = useState(null);
  const [error, setError] = useState(null);
  const [numSeats, setNumSeats] = useState(0);

  useEffect(() => {
    const fetchConcertDetails = async () => {
      try {
        const url = window.location.href;
        const concertIdIndex = url.lastIndexOf('/') + 1;
        const concertId = url.substring(concertIdIndex);
        const response = await ConcertServices.getConcertById(concertId);
        setConcert(response.data);
      } catch (error) {
        setError("Failed to fetch concert details");
      }
    };
    fetchConcertDetails();
  }, []);

  const handleBooking = async () => {
    try {
      const bookingType = 3; // Assuming booking type 3 is for concerts
      const url = window.location.href;
      const userIdIndex = url.lastIndexOf('user/') + 5;
      const userId = url.substring(userIdIndex).split('/')[0];
      const { venueId, concertDate, concertTime } = concert;
      console.log('Data type of concertTime:', typeof concertTime);
      console.log('Data type of concertDate:', typeof concertDate);
      const response = await BookingServices.createBooking({
        userId,
        bookingType,
        venueId,
        dateb: concertDate,
        timeb: concertTime,
        seatNo: numSeats,
        bookingStatus: "PENDING",
        amount: 0,
      });
      const bookingId = response.data.bookingId;
      showSuccessMessage('Concert booked successfully!');
      console.log('Response data for successful booking:', response.data);
      window.location.href = `${url}/${bookingId}`;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Booking conflict: There is already a booking for this venue, date, and time.');
      } else {
        console.error('Failed to book concert:', error);
        setError('Failed to book concert');
        if (error.response && error.response.data) {
          console.log('Response data for error:', error.response.data);
        }
      }
    }
  };

  const showSuccessMessage = (message) => {
    // Implement your logic to display success message
    alert(message);
  };

  const handleNumSeatsChange = (e) => {
    setNumSeats(parseInt(e.target.value));
  };

  return (
    <Box className={classes.container}>
      {error && <Typography className={classes.error}>{error}</Typography>}
      {concert && (
        <Card className={classes.concertDetails}>
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.title}>
              Concert Details
            </Typography>
            <Typography>
              <strong>Concert Name:</strong> {concert.concertName}
            </Typography>
            <Typography>
              <strong>Concert Date:</strong> {concert.concertDate}
            </Typography>
            <Typography>
              <strong>Concert Time:</strong> {concert.concertTime}
            </Typography>
            <Typography>
              <strong>Artist ID:</strong> {concert.artistId}
            </Typography>
            <Typography>
              <strong>Venue ID:</strong> {concert.venueId}
            </Typography>
            <Typography className={classes.label}>Number of Seats (0-5):</Typography>
            <Select
              id="numSeats"
              value={numSeats}
              onChange={handleNumSeatsChange}
              className={classes.select}
            >
              {[...Array(6).keys()].slice(1).map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
            <Button onClick={handleBooking} className={classes.button}>
              Book Concert
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Concerts;