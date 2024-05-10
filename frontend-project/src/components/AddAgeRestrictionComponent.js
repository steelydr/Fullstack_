import React, { useState, useEffect } from 'react';
import AgeRestrictionService from '../services/AgeRestrictionService';

const AddAgeRestrictionComponent = () => {
  const [ageRestrictionName, setAgeRestrictionName] = useState('');
  const [error, setError] = useState('');
  const [existingAgeRestrictions, setExistingAgeRestrictions] = useState([]);

  useEffect(() => {
    fetchExistingAgeRestrictions();
  }, []);

  const fetchExistingAgeRestrictions = async () => {
    try {
      const response = await AgeRestrictionService.getAllAgeRestrictions();
      setExistingAgeRestrictions(response.data);
    } catch (error) {
      console.error('Error fetching existing age restrictions:', error);
    }
  };

  const handleAgeRestrictionNameChange = (event) => {
    setAgeRestrictionName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!ageRestrictionName) {
      window.alert('Please enter an age restriction name');
      return;
    }
    try {
      const isDuplicate = existingAgeRestrictions.some(ageRestriction => ageRestriction.ageRestrictionName === ageRestrictionName);
      if (isDuplicate) {
        window.alert('Age restriction name already exists');
        return;
      }
      await AgeRestrictionService.addAgeRestriction({ ageRestrictionName });
      window.alert('Age restriction added successfully');
      setAgeRestrictionName('');
      // Refresh the list of existing age restrictions after adding a new one
      fetchExistingAgeRestrictions();
    } catch (error) {
      console.error('Error adding age restriction:', error);
      window.alert('Error adding age restriction');
    }
  };

  return (
    <div>
      <h2>Add Age Restriction</h2>
      {error && <div className="text-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ageRestrictionName">Age Restriction Name:</label>
          <input
            type="text"
            className="form-control"
            id="ageRestrictionName"
            value={ageRestrictionName}
            onChange={handleAgeRestrictionNameChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddAgeRestrictionComponent;
