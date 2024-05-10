import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AgeRestrictionService from '../services/AgeRestrictionService';

const AllAgeRestrictionComponent = () => {
  const [ageRestrictions, setAgeRestrictions] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedAgeRestrictionId, setEditedAgeRestrictionId] = useState('');
  const [editedAgeRestrictionName, setEditedAgeRestrictionName] = useState('');

  useEffect(() => {
    fetchAllAgeRestrictions();
  }, []);

  const fetchAllAgeRestrictions = async () => {
    try {
      const response = await AgeRestrictionService.getAllAgeRestrictions();
      setAgeRestrictions(response.data);
    } catch (error) {
      console.error('Failed to fetch age restrictions:', error);
      setError('Failed to fetch age restrictions');
    }
  };

  const deleteAgeRestriction = async (ageRestrictionId) => {
    try {
      await AgeRestrictionService.deleteAgeRestrictionById(ageRestrictionId);
      setAgeRestrictions(ageRestrictions.filter((ageRestriction) => ageRestriction.ageRestrictionId !== ageRestrictionId));
      window.alert('Age restriction deleted successfully');
    } catch (error) {
      console.error('Error deleting age restriction:', error);
      setError('Error deleting age restriction');
    }
  };

  const handleEdit = (ageRestrictionId, ageRestrictionName) => {
    setIsEditing(true);
    setEditedAgeRestrictionId(ageRestrictionId);
    setEditedAgeRestrictionName(ageRestrictionName);
  };

  const handleSave = async () => {
    try {
      // Check if the new age restriction name already exists
      const isDuplicate = ageRestrictions.some(ageRestriction => ageRestriction.ageRestrictionName === editedAgeRestrictionName && ageRestriction.ageRestrictionId !== editedAgeRestrictionId);
      if (isDuplicate) {
        window.alert('Age restriction name already exists');
        return;
      }
      await AgeRestrictionService.updateAgeRestriction(editedAgeRestrictionId, { ageRestrictionName: editedAgeRestrictionName });
      fetchAllAgeRestrictions();
      setIsEditing(false);
      window.alert('Age restriction updated successfully');
    } catch (error) {
      console.error('Error updating age restriction:', error);
      setError('Error updating age restriction');
    }
  };

  return (
    <div>
      <h2>All Age Restrictions</h2>
      {error && <div className="text-danger">{error}</div>}
      <div className="btn-container">
        <Link to="/add-age-restriction" className="btn btn-primary mb-3">
          Add Age Restriction
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Age Restriction Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ageRestrictions.map((ageRestriction) => (
            <tr key={ageRestriction.ageRestrictionId}>
              <td>
                {isEditing && editedAgeRestrictionId === ageRestriction.ageRestrictionId ? (
                  <input
                    type="text"
                    value={editedAgeRestrictionName}
                    onChange={(e) => setEditedAgeRestrictionName(e.target.value)}
                  />
                ) : (
                  ageRestriction.ageRestrictionName
                )}
              </td>
              <td>
                {isEditing && editedAgeRestrictionId === ageRestriction.ageRestrictionId ? (
                  <button className="btn btn-primary" onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button className="btn btn-danger mr-2" onClick={() => deleteAgeRestriction(ageRestriction.ageRestrictionId)}>
                      Delete
                    </button>
                    <button className="btn btn-primary" onClick={() => handleEdit(ageRestriction.ageRestrictionId, ageRestriction.ageRestrictionName)}>
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAgeRestrictionComponent;
