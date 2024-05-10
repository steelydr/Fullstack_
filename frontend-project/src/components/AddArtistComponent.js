import React, { useState } from 'react';
import ArtistService from '../services/ArtistService';

const AddArtistComponent = () => {
  const [artistName, setArtistName] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating to 0
  const [error, setError] = useState('');

  const handleArtistNameChange = (event) => {
    setArtistName(event.target.value);
  };

  const handleRatingChange = (event) => {
    const newRating = event.target.value > 10 ? 10 : event.target.value;
    setRating(newRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!artistName) {
      window.alert('Please enter the artist name');
      return;
    }
    try {
      await ArtistService.addArtist({ artistName, rating });
      window.alert('Artist added successfully');
      setArtistName('');
      setRating(0); // Reset rating to 0 after submission
    } catch (error) {
      if (error.response && error.response.status === 409) {
        window.alert('Artist name already exists');
      } else {
        console.error('Error adding artist:', error);
        window.alert('Error adding artist');
      }
    }
  };

  return (
    <div>
      <h2>Add Artist</h2>
      {error && <div className="text-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="artistName">Artist Name:</label>
          <input
            type="text"
            className="form-control"
            id="artistName"
            value={artistName}
            onChange={handleArtistNameChange}
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
            min={0} // Set minimum value to 0
            max={10} // Set maximum value to 10
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddArtistComponent;
