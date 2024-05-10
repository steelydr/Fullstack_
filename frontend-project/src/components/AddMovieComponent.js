import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MoviesService from '../services/MoviesService';

const AddMovieComponent = () => {
  const [movieName, setMovieName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [ageRestrictionId, setAgeRestrictionId] = useState('');
  const [venueId, setVenueId] = useState('');
  const [genre, setGenre] = useState('');
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [rating, setRating] = useState('');
  const [genreError, setGenreError] = useState('');
  const [ageRestrictionError, setAgeRestrictionError] = useState('');
  const [releaseDateError, setReleaseDateError] = useState('');
  const navigate = useNavigate();

  const saveMovie = async (e) => {
    e.preventDefault();
    try {
      if (!movieName || !releaseDate || !ageRestrictionId || !venueId || !genre || !director || !cast || !rating) {
        window.alert("All fields are required.");
        return;
      }

      const movie = {
        movieName,
        releaseDate,
        ageRestrictionId,
        venueId,
        genre,
        director,
        cast,
        rating
      };

      const response = await MoviesService.createMovie(movie);
      console.log(response.data);
      const movieId = response.data.movieId;
      window.alert("Movie Successfully Added");
      setGenreError('');
      setAgeRestrictionError('');
      setReleaseDateError('');
      navigate('/movies/' + movieId);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setGenreError("Invalid genre.");
        setAgeRestrictionError("Invalid age restriction ID.");
      } else {
        window.alert("An error occurred. Please enter the details correctly");
        console.log(error);
      }
    }
  };

  const handleAgeRestrictionIdChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === '') {
      setAgeRestrictionId(value);
      setAgeRestrictionError('');
    } else {
      window.alert('Age Restriction ID should be an integer.');
    }
  };

  const handleVenueIdChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === '') {
      setVenueId(value);
    } else {
      // Assuming you want to handle non-integer venue IDs differently
      window.alert('Venue ID should be an integer.');
    }
  };

  const handleReleaseDateChange = (e) => {
    const value = e.target.value;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(value) || value === '') {
      setReleaseDate(value);
      setReleaseDateError('');
    } else {
      setReleaseDateError('Release date should be in yyyy-mm-dd format.');
    }
  };

  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Movie</h3>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Movie Name</label>
                  <input
                    type="text"
                    placeholder="Enter movie name"
                    className="form-control"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Release Date</label>
                  <input
                    type="date"
                    placeholder="Enter release date"
                    className="form-control"
                    value={releaseDate}
                    onChange={handleReleaseDateChange}
                  />
                  {releaseDateError && <div className="text-danger">{releaseDateError}</div>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Age Restriction ID</label>
                  <input
                    type="text"
                    placeholder="Enter age restriction ID"
                    className="form-control"
                    value={ageRestrictionId}
                    onChange={handleAgeRestrictionIdChange}
                  />
                  {ageRestrictionError && <div className="text-danger">{ageRestrictionError}</div>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Venue ID</label>
                  <input
                    type="text"
                    placeholder="Enter venue ID"
                    className="form-control"
                    value={venueId}
                    onChange={handleVenueIdChange}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Genre</label>
                  <input
                    type="text"
                    placeholder="Enter genre"
                    className="form-control"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                  {genreError && <div className="text-danger">{genreError}</div>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Director</label>
                  <input
                    type="text"
                    placeholder="Enter director"
                    className="form-control"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Cast</label>
                  <input
                    type="text"
                    placeholder="Enter cast"
                    className="form-control"
                    value={cast}
                    onChange={(e) => setCast(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Rating</label>
                  <input
                    type="text"
                    placeholder="Enter rating"
                    className="form-control"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <button className="btn btn-success" onClick={saveMovie}>Submit</button>
                  <Link to="/movies" className="btn btn-danger">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieComponent;
