import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VenueTableService from '../services/VenueTableService';

const AllVenuesComponent = () => {
  const [venues, setVenues] = useState([]);
  const [editedVenue, setEditedVenue] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAllVenues();
  }, []);

  const fetchAllVenues = async () => {
    try {
      const response = await VenueTableService.getAllVenues();
      setVenues(response.data);
    } catch (error) {
      console.error("Failed to fetch venues:", error);
      window.alert('Failed to fetch venues');
    }
  };

  const deleteVenue = async (venueId) => {
    try {
      await VenueTableService.deleteVenueById(venueId);
      setVenues(venues.filter(venue => venue.venueId !== venueId));
      window.alert('Venue deleted successfully');
      console.log('Venue deleted successfully');
    } catch (error) {
      window.alert('Error deleting venue:');
      console.error('Error deleting venue:', error.response ? error.response.data : error);
    }
  };

  const updateVenueDetails = async (venueId, updatedVenueDetails) => {
    try {
      // Check if the updated venue name already exists
      const isNameExist = venues.some(venue => venue.venueName === updatedVenueDetails.venueName && venue.venueId !== venueId);
      if (isNameExist) {
        window.alert('Venue name already exists. Please choose a different name.');
        return;
      }
  
      await VenueTableService.updateVenue(venueId, updatedVenueDetails);
      setVenues(venues.map(venue => {
        if (venue.venueId === venueId) {
          return { ...venue, ...updatedVenueDetails };
        }
        return venue;
      }));
      window.alert('Venue updated successfully');
      cancelEdit(); // Exit edit mode
    } catch (error) {
      console.error('Error updating venue:', error.response ? error.response.data : error);
      window.alert('Error updating venue');
    }
  };
  
  

  const startEdit = (venue) => {
    setEditedVenue(venue);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditedVenue(null);
    setIsEditing(false);
  };

  const renderVenueRows = () => {
    return venues.map((venue) => (
      <tr key={venue.venueId}>
        <td>
          {isEditing && editedVenue.venueId === venue.venueId ? (
            <input
              type="text"
              value={editedVenue.venueName}
              onChange={(e) => setEditedVenue({ ...editedVenue, venueName: e.target.value })}
            />
          ) : (
            venue.venueName
          )}
        </td>
        <td>
          {isEditing && editedVenue.venueId === venue.venueId ? (
            <input
              type="text"
              value={editedVenue.location}
              onChange={(e) => setEditedVenue({ ...editedVenue, location: e.target.value })}
            />
          ) : (
            venue.location
          )}
        </td>
        <td>
          {isEditing && editedVenue.venueId === venue.venueId ? (
            <input
              type="text"
              value={editedVenue.capacity}
              onChange={(e) => setEditedVenue({ ...editedVenue, capacity: e.target.value })}
            />
          ) : (
            venue.capacity
          )}
        </td>
        <td>
          {isEditing && editedVenue.venueId === venue.venueId ? (
            <input
              type="text"
              value={editedVenue.contactInfo}
              onChange={(e) => setEditedVenue({ ...editedVenue, contactInfo: e.target.value })}
            />
          ) : (
            venue.contactInfo
          )}
        </td>
        <td>
          {isEditing && editedVenue.venueId === venue.venueId ? (
            <>
                <button className="btn btn-primary ml-2" onClick={() => updateVenueDetails(venue.venueId, { venueName: editedVenue.venueName, location: editedVenue.location, capacity: editedVenue.capacity, contactInfo: editedVenue.contactInfo })}>
                Save
              </button>
              <button className="btn btn-secondary ml-2" onClick={cancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary ml-2" onClick={() => startEdit(venue)}>
              Edit
            </button>
          )}
          <button className="btn btn-danger ml-2" onClick={() => deleteVenue(venue.venueId)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>All Venues</h2>
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Venue Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Contact Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderVenueRows()}</tbody>
        </table>
      </div>
      <div>
        <Link to="/venues" className="btn btn-primary">
          Add Venue
        </Link>
      </div>
    </div>
  );
};

export default AllVenuesComponent;
