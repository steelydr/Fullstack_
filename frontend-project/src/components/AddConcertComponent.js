import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ConcertServices from '../services/ConcertServices';

const AddConcertComponent = () => {
  const [concertName, setConcertName] = useState('');
  const [concertDate, setConcertDate] = useState('');
  const [concertTime, setConcertTime] = useState('');
  const [artistId, setArtistId] = useState('');
  const [venueId, setVenueId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleConcertTimeChange = (e) => {
    const timeValue = e.target.value;
    const regex = /^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/; // HH:mm:ss format

    if (regex.test(timeValue) || timeValue === '') {
      setConcertTime(timeValue);
      setError('');
    } else {
      setError('Time must be in HH:mm:ss format');
    }
  };

  const saveConcert = async (e) => {
    e.preventDefault();
  
    // Clear previous error messages
    setError('');
  
    // Validate input fields
    if (!concertName || !concertDate || !concertTime || !artistId || !venueId) {
      window.alert('All fields are required, including time in HH:mm:ss format.');
      return;
    }
  
    // Validate artist and venue ID
    if (isNaN(Number(artistId)) || isNaN(Number(venueId))) {
      window.alert('Artist ID and Venue ID should be numbers only.');
      return;
    }
  
    // Construct concert object
    const concert = { concertName, concertDate, concertTime, artistId, venueId };
  
    try {
      // Perform concert addition
      await ConcertServices.createConcert(concert);
      window.alert('Concert Added Successfully');
      navigate('/add-concert'); // Redirect on success
    } catch (error) {
      // Handle errors
      console.error(error);
      if (error.response) {
        if (error.response.status === 409) {
          window.alert('A concert with the same details already exists. Please provide unique concert details.');
        } else if (error.response.status === 500) {
          window.alert('There is a conflict regarding the artist. Please resolve it.');
        } else {
          window.alert('An error occurred. Please try again later.');
        }
      } else {
        window.alert('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  

  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3">
            <h3 className="text-center">Add Concert</h3>
            <div className="card-body">
              {error && <div className="text-danger mb-2">{error}</div>}
              <form onSubmit={saveConcert}>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    placeholder="Enter concert name"
                    className="form-control"
                    value={concertName}
                    onChange={(e) => setConcertName(e.target.value)}
                  />
                  <input
                    type="date"
                    className="form-control"
                    value={concertDate}
                    onChange={(e) => setConcertDate(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter artist ID"
                    className="form-control"
                    value={artistId}
                    onChange={(e) => setArtistId(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter venue ID"
                    className="form-control"
                    value={venueId}
                    onChange={(e) => setVenueId(e.target.value)}
                  />
                  <input
                    type="text"
                    name="concertTime"
                    className="form-control"
                    value={concertTime || ''}
                    onChange={handleConcertTimeChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <Link to="/concerts" className="btn btn-danger ms-2">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddConcertComponent;