import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GameService from '../services/GameService';

const AddGameComponent = () => {
  const [opponentA, setOpponentA] = useState('');
  const [opponentB, setOpponentB] = useState('');
  const [sportsId, setSportsId] = useState('');
  const [venueId, setVenueId] = useState('');
  const [gameDate, setGameDate] = useState('');
  const [grating, setGrating] = useState('');
  const navigate = useNavigate();

  const saveGame = async (e) => {
    e.preventDefault();
    try {
        if (!opponentA || !opponentB || !sportsId || !venueId || !gameDate || !grating) {
            window.alert("All fields are required.");
            return;
        }

        const game = {
            opponentA,
            opponentB,
            sportsId,
            venueId,
            gameDate,
            grating
        };

        await GameService.createGame(game);
        window.alert("Game Successfully Added");
        navigate('/games');
    } catch (error) {
        if (error.response && error.response.status === 500) {
            window.alert("There is a conflict between games added.");
        } else {
            window.alert("An error occurred. Please enter the details correctly");
            console.error('Error adding game:', error);
        }
    }
};

  

  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Game</h3>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Opponent A</label>
                  <input
                    type="text"
                    placeholder="Enter opponent A"
                    className="form-control"
                    value={opponentA}
                    onChange={(e) => setOpponentA(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Opponent B</label>
                  <input
                    type="text"
                    placeholder="Enter opponent B"
                    className="form-control"
                    value={opponentB}
                    onChange={(e) => setOpponentB(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Sports ID</label>
                  <input
                    type="number"
                    placeholder="Enter sports ID"
                    className="form-control"
                    value={sportsId}
                    onChange={(e) => setSportsId(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Venue ID</label>
                  <input
                    type="number"
                    placeholder="Enter venue ID"
                    className="form-control"
                    value={venueId}
                    onChange={(e) => setVenueId(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Game Date</label>
                  <input
                    type="date"
                    placeholder="Enter game date"
                    className="form-control"
                    value={gameDate}
                    onChange={(e) => setGameDate(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Grating</label>
                  <input
                    type="number"
                    placeholder="Enter grating"
                    className="form-control"
                    value={grating}
                    onChange={(e) => setGrating(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <button className="btn btn-success" onClick={saveGame}>Submit</button>
                  <Link to="/game/all" className="btn btn-danger">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGameComponent;