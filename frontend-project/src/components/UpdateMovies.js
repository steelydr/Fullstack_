import React, { useState, useEffect } from 'react';
import MoviesService from '../services/MoviesService';

const UpdateMovies = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedMovie, setUpdatedMovie] = useState(null);

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

  const handleDeleteMovie = async () => {
    try {
      const url = window.location.href;
      const movieIdIndex = url.lastIndexOf('/') + 1;
      const movieId = url.substring(movieIdIndex);
      await MoviesService.deleteMovie(movieId);
      window.alert("The movie deleted successfully");
      // Redirect or display success message after deletion
    } catch (error) {
      setError("Failed to delete movie");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setUpdatedMovie({ ...movie }); // Initialize updatedMovie with current movie details
  };

  const handleUpdate = async () => {
    try {
      const url = window.location.href;
      const movieIdIndex = url.lastIndexOf('/') + 1;
      const movieId = url.substring(movieIdIndex);
      await MoviesService.updateMovie(movieId, updatedMovie);
      setIsEditing(false);
      setMovie(updatedMovie);
      window.alert("The movie updated successfully");
    } catch (error) {
      setError("Failed to update movie");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedMovie({ ...updatedMovie, [name]: value });
  };

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}
      {movie && (
        <div className="movie-details">
          <h2>Movie Details</h2>
          {!isEditing ? (
            <>
              <p><strong>Title:</strong> {movie.movieName}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Release Date:</strong> {movie.releaseDate}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Cast:</strong> {movie.cast}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
              <button onClick={handleDeleteMovie}>Delete Movie</button>
              <button onClick={handleEdit}>Edit Movie</button>
            </>
          ) : (
            <>
              <input
                type="text"
                name="movieName"
                value={updatedMovie.movieName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="director"
                value={updatedMovie.director}
                onChange={handleChange}
              />
              <input
                type="date"
                name="releaseDate"
                value={updatedMovie.releaseDate}
                onChange={handleChange}
              />
              <input
                type="text"
                name="genre"
                value={updatedMovie.genre}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cast"
                value={updatedMovie.cast}
                onChange={handleChange}
              />
              <button onClick={handleUpdate}>Save Changes</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateMovies;
