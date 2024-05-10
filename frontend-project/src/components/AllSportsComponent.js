import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SportsService from '../services/SportsService';

const AllSportsComponent = () => {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllSports();
  }, []);

  const fetchAllSports = async () => {
    try {
      const response = await SportsService.getAllSports();
      setSports(response.data);
    } catch (error) {
      console.error('Failed to fetch sports:', error);
      setError('Failed to fetch sports');
    }
  };

  const deleteSports = async (sportsId) => {
    try {
      await SportsService.deleteSportsById(sportsId);
      setSports(sports.filter((sports) => sports.sportsId !== sportsId));
      window.alert('Sports deleted successfully');
    } catch (error) {
      console.error('Error deleting sports:', error);
      setError('Error deleting sports');
    }
  };

  const updateSports = async (sportsId, sportsName) => {
    try {
      await SportsService.updateSports(sportsId, { sportsName });
      window.alert('Sports updated successfully');
      // You may want to refetch the sports list after updating
      fetchAllSports();
    } catch (error) {
      if (error.response && error.response.status === 409) {
        window.alert('Sports name already exists. Please choose a different name.');
      } else {
      console.error('Error updating sports:', error);
      setError('Error updating sports');
      }
    }
  };

  return (
    <div>
      <h2>All Sports</h2>
      {error && <div className="text-danger">{error}</div>}
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sports Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sports.map((sports) => (
              <tr key={sports.sportsId}>
                <td>{sports.sportsName}</td>
                <td>
                  <button className="btn btn-danger mr-2" onClick={() => deleteSports(sports.sportsId)}>
                    Delete
                  </button>
                  <button className="btn btn-primary" onClick={() => updateSports(sports.sportsId, prompt('Enter new sports name'))}>
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Link to="/add-sports" className="btn btn-primary">
          Add Sports
        </Link>
      </div>
    </div>
  );
};

export default AllSportsComponent;
