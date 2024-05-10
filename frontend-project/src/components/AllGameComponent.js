import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameService from '../services/GameService';

const AllGameComponent = () => {
  const [games, setGames] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchAllGames();
  }, []);

  const fetchAllGames = async () => {
    try {
      const response = await GameService.getAllGames();
      setGames(response.data);
    } catch (error) {
      console.error("Failed to fetch games:", error);
      window.alert('Failed to fetch games');
    }
  };

  const deleteGame = async (gameId) => {
    try {
      await GameService.deleteGame(gameId);
      const updatedGames = games.filter(game => game.gameId !== gameId);
      setGames(updatedGames);
      window.alert('Game deleted successfully');
    } catch (error) {
      window.alert('Error deleting game');
      console.error('Error deleting game:', error);
    }
  };

  const toggleEdit = (gameId, game) => {
    setIsEditing({ ...isEditing, [gameId]: !isEditing[gameId] });
    if (!isEditing[gameId]) { // When starting to edit
      setEditValues({ ...editValues, [gameId]: game });
    }
  };

  const handleInputChange = (gameId, field, value) => {
    setEditValues({
      ...editValues,
      [gameId]: { ...editValues[gameId], [field]: value },
    });
  };

  const updateGame = async (gameId) => {
    const updatedGame = editValues[gameId];
    try {
      await GameService.updateGame(gameId, updatedGame);
      const updatedGames = games.map(game => game.gameId === gameId ? { ...game, ...updatedGame } : game);
      setGames(updatedGames);
      setIsEditing({ ...isEditing, [gameId]: false });
      setEditValues({ ...editValues, [gameId]: undefined });
      window.alert('Game updated successfully');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        window.alert("There is a conflict between games added.");
    } else {
      window.alert('Error updating game');
      console.error('Error updating game:', error);
    }
  }
  };

  const renderGameRows = () => {
    return games.map((game) => (
      <tr key={game.gameId}>
        <td>
          {isEditing[game.gameId] ? (
            <input type="text" value={editValues[game.gameId].opponentA} onChange={(e) => handleInputChange(game.gameId, 'opponentA', e.target.value)} />
          ) : (
            game.opponentA
          )}
        </td>
        <td>
          {isEditing[game.gameId] ? (
            <input type="text" value={editValues[game.gameId].opponentB} onChange={(e) => handleInputChange(game.gameId, 'opponentB', e.target.value)} />
          ) : (
            game.opponentB
          )}
        </td>
        <td>
          {isEditing[game.gameId] ? (
            <input type="number" value={editValues[game.gameId].sportsId} onChange={(e) => handleInputChange(game.gameId, 'sportsId', e.target.value)} />
          ) : (
            game.sportsId
          )}
        </td>
        <td>
          {isEditing[game.gameId] ? (
            <input type="number" value={editValues[game.gameId].venueId} onChange={(e) => handleInputChange(game.gameId, 'venueId', e.target.value)} />
          ) : (
            game.venueId
          )}
        </td>
        <td>
          {isEditing[game.gameId] ? (
            <input type="date" value={editValues[game.gameId].gameDate} onChange={(e) => handleInputChange(game.gameId, 'gameDate', e.target.value)} />
          ) : (
            game.gameDate
          )}
        </td>
        <td>
          {isEditing[game.gameId] ? (
            <input type="number" value={editValues[game.gameId].grating} onChange={(e) => handleInputChange(game.gameId, 'grating', e.target.value)} />
          ) : (
            game.grating
          )}
        </td>
        <td>
          {isEditing[game.gameId] ? (
            <>
              <button className="btn btn-success mr-2" onClick={() => updateGame(game.gameId)}>Save</button>
              <button className="btn btn-secondary" onClick={() => toggleEdit(game.gameId)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn btn-primary mr-2" onClick={() => toggleEdit(game.gameId, game)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteGame(game.gameId)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>All Games</h2>
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Opponent A</th>
              <th>Opponent B</th>
              <th>Sports ID</th>
              <th>Venue ID</th>
              <th>Game Date</th>
              <th>Grating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderGameRows()}</tbody>
        </table>
      </div>
      <div>
        <Link to="/add-game" className="btn btn-primary">
          Add Game
        </Link>
      </div>
    </div>
  );
};

export default AllGameComponent;
