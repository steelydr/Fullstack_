import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logoImage from '../images/logo.jpg';
import { Grid, Typography, CircularProgress, Box, Card, CardContent, Slide, Button, makeStyles } from '@material-ui/core';
import { AppBar, Toolbar, Avatar } from '@material-ui/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CardsPerPage = 3;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000000',
    color: '#e5e5e5',
    padding: theme.spacing(4),
  },
  sectionTitle: {
    color: '#b3d9ff',
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#b3d9ff',
    border: '1px solid #b3d9ff',
    borderRadius: '4px',
    padding: '6px 12px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
  },
  card: {
    backgroundColor: '#1a1a1a',
    color: '#e5e5e5',
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: '#b3d9ff',
  },
  cardText: {
    fontSize: '0.9rem',
    color: '#e5e5e5',
  },
}));

const GameCard = ({ game }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Slide direction="left" in={true} timeout={500}>
      <Grid item xs={12} sm={6} md={4}>
        <Link to={`${location.pathname}/b/2/${game.game_id}`} style={{ textDecoration: 'none' }}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2" className={classes.cardTitle}>
                {game.opponenta} vs {game.opponentb}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Date: {new Date(game.game_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Venue ID: {game.venue_id}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Rating: {game.grating}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Slide>
  );
};

const MovieCard = ({ movie }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Slide direction="left" in={true} timeout={500}>
      <Grid item xs={12} sm={6} md={4}>
        <Link to={`${location.pathname}/b/1/${movie.movie_id}`} style={{ textDecoration: 'none' }}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2" className={classes.cardTitle}>
                {movie.movie_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Release Date: {new Date(movie.release_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Genre: {movie.genre}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Director: {movie.director}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Cast: {movie.mcast}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Rating: {movie.mrating}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Slide>
  );
};

const ConcertCard = ({ concert }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Slide direction="left" in={true} timeout={500}>
      <Grid item xs={12} sm={6} md={4}>
        <Link to={`${location.pathname}/b/3/${concert.concert_id}`} style={{ textDecoration: 'none' }}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="h2" className={classes.cardTitle}>
                {concert.concert_name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Date: {new Date(concert.concert_date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Time: {concert.concert_time}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.cardText}>
                Venue ID: {concert.venue_id}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </Slide>
  );
};

const Home = () => {
  const classes = useStyles();
  const [games, setGames] = useState([]);
  const [movies, setMovies] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentGamePage, setCurrentGamePage] = useState(1);
  const [currentMoviePage, setCurrentMoviePage] = useState(1);
  const [currentConcertPage, setCurrentConcertPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const currentPath = location.pathname.split('/');
    const userId = currentPath[2]; // Assuming the user ID is the third part of the URL path
    const destinationPath = `/user/${userId}`;
    navigate(destinationPath);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [gamesResponse, moviesResponse, concertsResponse] = await Promise.all([
        axios.get('http://localhost:3002/allg'),
        axios.get('http://localhost:3002/allm'),
        axios.get('http://localhost:3002/allc'),
      ]);
      setGames(gamesResponse.data);
      setMovies(moviesResponse.data);
      setConcerts(concertsResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handlePrevGamePage = () => {
    if (currentGamePage > 1) {
      setCurrentGamePage(currentGamePage - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleNextGamePage = () => {
    setCurrentGamePage(currentGamePage + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrevMoviePage = () => {
    if (currentMoviePage > 1) {
      setCurrentMoviePage(currentMoviePage - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleNextMoviePage = () => {
    setCurrentMoviePage(currentMoviePage + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrevConcertPage = () => {
    if (currentConcertPage > 1) {
      setCurrentConcertPage(currentConcertPage - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleNextConcertPage = () => {
    setCurrentConcertPage(currentConcertPage + 1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Avatar
            alt="Logo"
            src={logoImage}
            style={{ marginRight: '8px', cursor: 'pointer' }}
            onClick={handleLogoClick}
          />
        </Toolbar>
      </AppBar>
      <Typography variant="h5" component="h2" className={classes.sectionTitle}>
        Games
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handlePrevGamePage}
          disabled={currentGamePage === 1}
          aria-label="Previous Games"
        >
          &lt;
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleNextGamePage}
          aria-label="Next Games"
        >
          &gt;
        </Button>
      </div>
      <Grid container spacing={2}>
        {games.slice((currentGamePage - 1) * CardsPerPage, currentGamePage * CardsPerPage).map((game) => (
          <GameCard key={game.sports_id} game={game} />
        ))}
      </Grid>

      <Typography variant="h5" component="h2" className={classes.sectionTitle}>
        Movies
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handlePrevMoviePage}
          disabled={currentMoviePage === 1}
          aria-label="Previous Movies"
        >
          &lt;
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleNextMoviePage}
          aria-label="Next Movies"
        >
          &gt;
        </Button>
      </div>
      <Grid container spacing={2}>
        {movies.slice((currentMoviePage - 1) * CardsPerPage, currentMoviePage * CardsPerPage).map((movie) => (
          <MovieCard key={movie.movie_name} movie={movie} />
        ))}
      </Grid>

      <Typography variant="h5" component="h2" className={classes.sectionTitle}>
        Concerts
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handlePrevConcertPage}
          disabled={currentConcertPage === 1}
          aria-label="Previous Concerts"
        >
          &lt;
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleNextConcertPage}
          aria-label="Next Concerts"
        >
          &gt;
        </Button>
      </div>
      <Grid container spacing={2}>
        {concerts.slice((currentConcertPage - 1) * CardsPerPage, currentConcertPage * CardsPerPage).map((concert) => (
          <ConcertCard key={concert.artist_id} concert={concert} />
        ))}
      </Grid>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box mt={2}>
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Home;