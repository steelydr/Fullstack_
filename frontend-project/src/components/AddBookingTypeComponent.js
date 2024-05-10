import React, { useState } from 'react';
import BookingTypeService from '../services/BookingTypeService';

const AddBookingTypeComponent = () => {
  const [bookingName, setBookingName] = useState('');
  const [error, setError] = useState('');

  const handleBookingNameChange = (event) => {
    setBookingName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!bookingName) {
      setError('Please enter a booking type name');
      return;
    }
    try {
      await BookingTypeService.addBookingType({ bookingName });
      window.alert('Booking type added successfully');
      setBookingName('');
    } catch (error) {
      console.error('Error adding booking type:', error);
      setError('Error adding booking type');
    }
  };

  return (
    <div>
      <h2>Add Booking Type</h2>
      {error && <div className="text-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookingName">Booking Type Name:</label>
          <input
            type="text"
            className="form-control"
            id="bookingName"
            value={bookingName}
            onChange={handleBookingNameChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBookingTypeComponent;
