import React, { useState } from 'react';
import RatingServices from '../services/RatingServices';

const AddRatingComponent = () => {
  const [userId, setUserId] = useState('');
  const [artistId, setArtistId] = useState('');
  const [movieId, setMovieId] = useState('');
  const [gameId, setGameId] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleArtistIdChange = (event) => {
    setArtistId(event.target.value);
  };

  const handleMovieIdChange = (event) => {
    setMovieId(event.target.value);
  };

  const handleGameIdChange = (event) => {
    setGameId(event.target.value);
  };

  const handleRatingChange = (event) => {
    const newRating = event.target.value > 10 ? 10 : event.target.value;
    setRating(newRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userId || !artistId || !movieId || !gameId) {
      window.alert('Please enter all IDs');
      return;
    }
    try {
      await RatingServices.createRating({ userId, artistId, movieId, gameId, rating });
      window.alert('Rating added successfully');
      setUserId('');
      setArtistId('');
      setMovieId('');
      setGameId('');
      setRating(0);
    } catch (error) {
        window.alert('The userid,artistid,movieid combination already exists');
        if (error.response && error.response.status === 409) {
            try {
              await RatingServices.updateRating(userId, artistId, movieId, gameId, {rating});
              window.alert('Rating updated successfully');
            } catch (updateError) {
              console.error('Error updating rating:', updateError);
              window.alert('Error updating rating');
            }
          } else {
            console.error('Error adding rating:', error);
            window.alert('Error adding rating');
          }
        }
      };
  return (
    <div>
      <h2>Add Rating</h2>
      {error && <div className="text-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            className="form-control"
            id="userId"
            value={userId}
            onChange={handleUserIdChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="artistId">Artist ID:</label>
          <input
            type="text"
            className="form-control"
            id="artistId"
            value={artistId}
            onChange={handleArtistIdChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="movieId">Movie ID:</label>
          <input
            type="text"
            className="form-control"
            id="movieId"
            value={movieId}
            onChange={handleMovieIdChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gameId">Game ID:</label>
          <input
            type="text"
            className="form-control"
            id="gameId"
            value={gameId}
            onChange={handleGameIdChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            value={rating}
            onChange={handleRatingChange}
            min={0}
            max={10}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddRatingComponent;
