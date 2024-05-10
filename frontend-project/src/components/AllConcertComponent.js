import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ConcertServices from '../services/ConcertServices';

const AllConcertComponent = () => {
  const [concerts, setConcerts] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchAllConcerts();
  }, []);

  const fetchAllConcerts = async () => {
    try {
      const response = await ConcertServices.getAllConcerts();
      setConcerts(response.data);
    } catch (error) {
      console.error("Failed to fetch concerts:", error);
      window.alert('Failed to fetch concerts');
    }
  };

  const deleteConcert = async (concertId) => {
    try {
      await ConcertServices.deleteConcert(concertId);
      const updatedConcerts = concerts.filter(concert => concert.concertId !== concertId);
      setConcerts(updatedConcerts);
      window.alert('Concert deleted successfully');
    } catch (error) {
      window.alert('Error deleting concert');
      console.error('Error deleting concert:', error);
    }
  };
  

  const toggleEdit = (concertId, concert) => {
    setIsEditing({ ...isEditing, [concertId]: !isEditing[concertId] });
    if (!isEditing[concertId]) { // When starting to edit
      setEditValues({ ...editValues, [concertId]: concert });
    }
  };

  const handleInputChange = (concertId, field, value) => {
    setEditValues({
      ...editValues,
      [concertId]: { ...editValues[concertId], [field]: value },
    });
  };

  const updateConcert = async (concertId) => {
    const updatedConcert = editValues[concertId];
    try {
      await ConcertServices.updateConcert(concertId, updatedConcert);
      const updatedConcerts = concerts.map(concert => concert.concertId === concertId ? { ...concert, ...updatedConcert } : concert);
      setConcerts(updatedConcerts);
      setIsEditing({ ...isEditing, [concertId]: false });
      setEditValues({ ...editValues, [concertId]: undefined });
      window.alert('Concert updated successfully');
    } catch (error) {
      window.alert('Error updating concert');
      console.error('Error updating concert:', error);
    }
  };
  

  const renderConcertRows = () => {
    return concerts.map((concert) => (
      <tr key={concert.concertId}>
        <td>
          {isEditing[concert.concertId] ? (
            <input type="text" value={editValues[concert.concertId].concertName} onChange={(e) => handleInputChange(concert.concertId, 'concertName', e.target.value)} />
          ) : (
            concert.concertName
          )}
        </td>
        <td>
          {isEditing[concert.concertId] ? (
            <input type="text" value={editValues[concert.concertId].artistId} onChange={(e) => handleInputChange(concert.concertId, 'artistId', e.target.value)} />
          ) : (
            concert.artistId
          )}
        </td>
        <td>
          {isEditing[concert.concertId] ? (
            <input type="text" value={editValues[concert.concertId].venueId} onChange={(e) => handleInputChange(concert.concertId, 'venueId', e.target.value)} />
          ) : (
            concert.venueId
          )}
        </td>
        <td>
          {isEditing[concert.concertId] ? (
            <input type="date" value={editValues[concert.concertId].concertDate} onChange={(e) => handleInputChange(concert.concertId, 'concertDate', e.target.value)} />
          ) : (
            concert.concertDate
          )}
        </td>
        <td>
          {isEditing[concert.concertId] ? (
            <input type="time" value={editValues[concert.concertId].concertTime} onChange={(e) => handleInputChange(concert.concertId, 'concertTime', e.target.value)} />
          ) : (
            concert.concertTime
          )}
        </td>
        <td>
          {isEditing[concert.concertId] ? (
            <>
              <button className="btn btn-success mr-2" onClick={() => updateConcert(concert.concertId)}>Save</button>
              <button className="btn btn-secondary" onClick={() => toggleEdit(concert.concertId)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn btn-primary mr-2" onClick={() => toggleEdit(concert.concertId, concert)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteConcert(concert.concertId)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>All Concerts</h2>
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Concert Name</th>
              <th>Artist ID</th>
              <th>Venue ID</th>
              <th>Concert Date</th>
              <th>Concert Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderConcertRows()}</tbody>
        </table>
      </div>
      <div>
        <Link to="/add-concert" className="btn btn-primary">
          Add Concert
        </Link>
      </div>
    </div>
  );
};

export default AllConcertComponent;
