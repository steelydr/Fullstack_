import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import VenueTableService from '../services/VenueTableService';

const AddVenueComponent = () => {
  const [venueName, setVenueName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const navigate = useNavigate();

  const saveVenue = async (e) => {
    e.preventDefault();
    if (!venueName) {
      window.alert("Venue Name field is required.");
      return;
    } else if (!location) {
      window.alert("Location field is required.");
      return;
    } else if (!capacity) {
      window.alert("Capacity field is required.");
      return;
    } else if (!contactInfo) {
      window.alert("Contact Info field is required.");
      return;
    }
  
    try {
      // Fetch all venues
      const response = await VenueTableService.getAllVenues();
      const existingVenues = response.data;
      // Check if the venue name already exists
      const isNameExist = existingVenues.some(venue => venue.venueName.toLowerCase() === venueName.toLowerCase());
      if (isNameExist) {
        window.alert('Venue name already exists. Please choose a different name.');
        return;
      }
  
      const venue = {
        venueName: venueName,
        location: location,
        capacity: capacity,
        contactInfo: contactInfo
      };
  
      await VenueTableService.createVenue(venue);
      window.alert("Venue Successfully Added");
      navigate('/venues');
    } catch (error) {
      window.alert("An error occurred. Please enter the details correctly");
      console.error(error);
    }
  };
  

  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Venue</h3>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Venue Name</label>
                  <input
                    type="text"
                    placeholder="Enter Venue Name"
                    name="venueName"
                    className="form-control"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    placeholder="Enter Location"
                    name="location"
                    className="form-control"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Capacity</label>
                  <input
                    type="text"
                    placeholder="Enter Capacity"
                    name="capacity"
                    className="form-control"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Contact Info</label>
                  <input
                    type="text"
                    placeholder="Enter Contact Info"
                    name="contactInfo"
                    className="form-control"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <button className="btn btn-success" onClick={saveVenue}>Submit</button>
                  <Link to="/venues" className="btn btn-danger">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddVenueComponent;
