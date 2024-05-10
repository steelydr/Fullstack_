import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArtistService from '../services/ArtistService';

const AllArtistComponent = () => {
  const [artists, setArtists] = useState([]);
  const [error] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedRating, setEditedRating] = useState('');

  useEffect(() => {
    fetchAllArtists();
  }, []);

  const fetchAllArtists = async () => {
    try {
      const response = await ArtistService.getAllArtists();
      setArtists(response.data);
    } catch (error) {
      console.error('Failed to fetch artists:', error);
      window.alert('Failed to fetch artists');
    }
  };

  const deleteArtist = async (artistId) => {
    try {
      await ArtistService.deleteArtistById(artistId);
      setArtists(artists.filter((artist) => artist.artistId !== artistId));
      window.alert('Artist deleted successfully');
    } catch (error) {
      console.error('Error deleting artist:', error);
      window.alert('Error deleting artist');
    }
  };

  const handleEdit = (artistId, artistName, rating) => {
    setEditingId(artistId);
    setEditedName(artistName);
    setEditedRating(rating);
  };

  const handleSave = async (artistId) => {
    try {
      await ArtistService.updateArtist(artistId, { artistName: editedName, rating: editedRating });
      setEditingId(null);
      window.alert('Artist updated successfully');
      fetchAllArtists();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        window.alert('Artist name already exists');
      } else {
      console.error('Error updating artist:', error);
      window.alert('Error updating artist');
      }}
  };

  const renderRating = (rating) => {
    return Math.max(0, Math.min(10, rating)); 
  };
  
  return (
    <div>
      <h2>All Artists</h2>
      {error && <div className="text-danger">{error}</div>}
      <div className="btn-container">
        <Link to="/add-artist" className="btn btn-primary mb-3">
          Add Artist
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Artist Name</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist.artistId}>
                <td>
                  {editingId === artist.artistId ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  ) : (
                    artist.artistName
                  )}
                </td>
                <td>
                  {editingId === artist.artistId ? (
                    <input
                      type="number"
                      value={editedRating}
                      onChange={(e) => setEditedRating(e.target.value)}
                    />
                  ) : (
                    renderRating(artist.rating)
                  )}
                </td>
                <td>
                  {editingId === artist.artistId ? (
                    <button className="btn btn-primary mr-2" onClick={() => handleSave(artist.artistId)}>
                      Save
                    </button>
                  ) : (
                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(artist.artistId, artist.artistName, artist.rating)}>
                      Edit
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={() => deleteArtist(artist.artistId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllArtistComponent;
