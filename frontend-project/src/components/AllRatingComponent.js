import React, { useState, useEffect } from 'react';
import RatingServices from '../services/RatingServices';

const AllRatingComponent = () => {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedRating, setEditedRating] = useState('');

  useEffect(() => {
    fetchAllRatings();
  }, []);

  const fetchAllRatings = async () => {
    try {
      const response = await RatingServices.getAllRatings();
      setRatings(response.data);
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
      setError('Failed to fetch ratings');
    }
  };

  const deleteRating = async (userId, artistId, movieId, gameId) => {
    try {
      await RatingServices.deleteRating(userId, artistId, movieId, gameId);
      setRatings(ratings.filter((rating) => rating.userId !== userId));
      window.alert('Rating deleted successfully');
    } catch (error) {
      console.error('Error deleting rating:', error);
      window.alert('Error deleting rating');
    }
  };

  const handleEdit = (userId, artistId, movieId, gameId, rating) => {
    setEditingId(userId);
    setEditedRating(rating);
  };
  const renderGameRows = () => {
    return ratings.map((rating, index) => (
      <tr key={`${rating.userId}-${rating.artistId}-${rating.movieId}-${rating.gameId}-${index}`}>
        <td>{rating.userId}</td>
        <td>{rating.artistId}</td>
        <td>{rating.movieId}</td>
        <td>{rating.gameId}</td>
        <td>
          {editingId === rating.userId ? (
            <input
              type="number"
              value={editedRating}
              onChange={(e) => setEditedRating(e.target.value)}
            />
          ) : (
            rating.rating
          )}
        </td>
        <td>
          {editingId !== rating.userId && (
            <button className="btn btn-primary mr-2" onClick={() => handleEdit(rating.userId, rating.artistId, rating.movieId, rating.gameId, rating.rating)}>
              Edit
            </button>
          )}
          <button className="btn btn-danger" onClick={() => deleteRating(rating.userId, rating.artistId, rating.movieId, rating.gameId)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>All Ratings</h2>
      {error && <div className="text-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Artist ID</th>
            <th>Movie ID</th>
            <th>Game ID</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderGameRows()}
        </tbody>
      </table>
    </div>
  );
};

export default AllRatingComponent;
