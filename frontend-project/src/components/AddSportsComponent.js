import React, { useState } from 'react';
import SportsService from '../services/SportsService';

const AddSportsComponent = () => {
  const [sportsName, setSportsName] = useState('');
  const [error] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SportsService.addSports({ sportsName });
      window.alert('Sports added successfully');
      setSportsName('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        window.alert('Sports name already exists. Please choose a different name.');
      } else {
        console.error('Error adding sports:', error);
        window.alert('An error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <div>
      <h2>Add Sports</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="sportsName">Sports Name:</label>
          <input
            type="text"
            id="sportsName"
            className="form-control"
            value={sportsName}
            onChange={(e) => setSportsName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Sports
        </button>
        {error && <div className="text-danger">{error}</div>}
      </form>
    </div>
  );
};

export default AddSportsComponent;
