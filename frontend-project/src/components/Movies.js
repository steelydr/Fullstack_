import React, { useState, useEffect } from 'react';
import MoviesService from '../services/MoviesService';
import BookingServices from '../services/BookingServices';
import { Typography, Box, Card, CardContent, Button, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  movieDetails: {
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

const Movies = () => {
  const classes = useStyles();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [numTickets, setNumTickets] = useState(0);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const url = window.location.href;
        const movieIdIndex = url.lastIndexOf('/') + 1;
        const movieId = url.substring(movieIdIndex);
        const response = await MoviesService.getMovieById(movieId);
        setMovie(response.data);
      } catch (error) {
        setError("Failed to fetch movie details");
      }
    };
    fetchMovieDetails();
  }, []);

  const handleBooking = async () => {
    try {
      const bookingType = 2; // Assuming a similar booking type for movies
      const url = window.location.href;
      const userIdIndex = url.lastIndexOf('user/') + 5;
      const userId = url.substring(userIdIndex).split('/')[0];
      const { venueId, releaseDate } = movie; // Assuming venueId and releaseDate are available for booking
      const response = await BookingServices.createBooking({
        userId,
        bookingType,
        venueId,
        dateb: releaseDate, // Assuming releaseDate is the date of the movie
        timeb: null,
        numTickets,
        bookingStatus: "PENDING",
        amount: 0,
      });
      const bookingId = response.data.bookingId;
      showSuccessMessage('Movie booked successfully!');
      console.log('Response data for successful booking:', response.data);
      window.location.href = `${url}/${bookingId}`;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Booking conflict: There is already a booking for this venue and date.');
      } else {
        console.error('Failed to book movie:', error);
        setError('Failed to book movie');
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

  const handleNumTicketsChange = (e) => {
    setNumTickets(parseInt(e.target.value));
  };

  return (
    <Box className={classes.container}>
      {error && <Typography className={classes.error}>{error}</Typography>}
      {movie && (
        <Card className={classes.movieDetails}>
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.title}>
              Movie Details
            </Typography>
            <Typography>
              <strong>Title:</strong> {movie.movieName}
            </Typography>
            <Typography>
              <strong>Director:</strong> {movie.director}
            </Typography>
            <Typography>
              <strong>Release Date:</strong> {movie.releaseDate}
            </Typography>
            <Typography className={classes.label}>Number of Tickets:</Typography>
            <Select
              id="numTickets"
              value={numTickets}
              onChange={handleNumTicketsChange}
              className={classes.select}
            >
              {[...Array(6).keys()].slice(1).map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
            <Button onClick={handleBooking} className={classes.button}>
              Book Movie
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Movies;