import React, { useState, useEffect } from 'react';
import GameService from '../services/GameService';
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
  gameDetails: {
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

const Games = () => {
  const classes = useStyles();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [numSeats, setNumSeats] = useState(0);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const url = window.location.href;
        const gameIdIndex = url.lastIndexOf('/') + 1;
        const gameId = url.substring(gameIdIndex);
        const response = await GameService.getGameById(gameId);
        setGame(response.data);
      } catch (error) {
        setError("Failed to fetch game details");
      }
    };
    fetchGameDetails();
  }, []);

  const handleBooking = async () => {
    try {
      const bookingType = 2;
      const url = window.location.href;
      const userIdIndex = url.lastIndexOf('user/') + 5;
      const userId = url.substring(userIdIndex).split('/')[0];
      const { venueId, gameDate } = game;
      const response = await BookingServices.createBooking({
        userId,
        bookingType,
        venueId,
        dateb: gameDate,
        timeb: null,
        seatNo: numSeats,
        bookingStatus: "PENDING",
        amount: 0,
      });
      const bookingId = response.data.bookingId;
      showSuccessMessage('Game booked successfully!');
      console.log('Response data for successful booking:', response.data);
      window.location.href = `${url}/${bookingId}`;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Booking conflict: There is already a booking for this venue and date.');
      } else {
        console.error('Failed to book game:', error);
        setError('Failed to book game');
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
      {game && (
        <Card className={classes.gameDetails}>
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.title}>
              Game Details
            </Typography>
            <Typography>
              <strong>Opponent A:</strong> {game.opponentA}
            </Typography>
            <Typography>
              <strong>Opponent B:</strong> {game.opponentB}
            </Typography>
            <Typography>
              <strong>Game Date:</strong> {game.gameDate}
            </Typography>
            <Typography>
              <strong>Venue ID:</strong> {game.venueId}
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
              Book Game
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Games;