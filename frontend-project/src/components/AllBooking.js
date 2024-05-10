import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookingServices from '../services/BookingServices';

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const response = await BookingServices.getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      window.alert('Failed to fetch bookings');
    }
  };

  const deleteBookingById = async (bookingId) => {
    try {
      await BookingServices.deleteBookingById(bookingId);
      const updatedBookings = bookings.filter(booking => booking.bookingId !== bookingId);
      setBookings(updatedBookings);
      window.alert('Booking deleted successfully');
    } catch (error) {
      window.alert('Error deleting booking');
      console.error('Error deleting booking:', error);
    }
  };

  const toggleEdit = (bookingId, booking) => {
    setIsEditing({ ...isEditing, [bookingId]: !isEditing[bookingId] });
    if (!isEditing[bookingId]) { // When starting to edit
      setEditValues({ ...editValues, [bookingId]: booking });
    }
  };

  const handleInputChange = (bookingId, field, value) => {
    setEditValues({
      ...editValues,
      [bookingId]: { ...editValues[bookingId], [field]: value },
    });
  };

  const updateBooking = async (bookingId) => {
    const updatedBooking = editValues[bookingId];
    try {
      await BookingServices.updateBooking(bookingId, updatedBooking);
      const updatedBookings = bookings.map(booking => booking.bookingId === bookingId ? { ...booking, ...updatedBooking } : booking);
      setBookings(updatedBookings);
      setIsEditing({ ...isEditing, [bookingId]: false });
      setEditValues({ ...editValues, [bookingId]: undefined });
      window.alert('Booking updated successfully');
    } catch (error) {
      window.alert('Error updating booking');
      console.error('Error updating booking:', error);
    }
  };

  const renderBookingRows = () => {
    return bookings.map((booking) => (
      <tr key={booking.bookingId}>
        <td>
          {isEditing[booking.bookingId] ? (
            <input type="text" value={editValues[booking.bookingId].userId} onChange={(e) => handleInputChange(booking.bookingId, 'userId', e.target.value)} />
          ) : (
            booking.userId
          )}
        </td>
        <td>
          {isEditing[booking.bookingId] ? (
            <input type="text" value={editValues[booking.bookingId].bookingType} onChange={(e) => handleInputChange(booking.bookingId, 'bookingType', e.target.value)} />
          ) : (
            booking.bookingType
          )}
        </td>
        <td>
          {isEditing[booking.bookingId] ? (
            <input type="text" value={editValues[booking.bookingId].venueId} onChange={(e) => handleInputChange(booking.bookingId, 'venueId', e.target.value)} />
          ) : (
            booking.venueId
          )}
        </td>
        <td>
          {isEditing[booking.bookingId] ? (
            <input type="date" value={editValues[booking.bookingId].dateb} onChange={(e) => handleInputChange(booking.bookingId, 'dateb', e.target.value)} />
          ) : (
            booking.dateb
          )}
        </td>
        <td>
          {isEditing[booking.bookingId] ? (
            <input type="time" value={editValues[booking.bookingId].timeb} onChange={(e) => handleInputChange(booking.bookingId, 'timeb', e.target.value)} />
          ) : (
            booking.timeb
          )}
        </td>
        <td>
          {isEditing[booking.bookingId] ? (
            <input type="text" value={editValues[booking.bookingId].seatNo} onChange={(e) => handleInputChange(booking.bookingId, 'seatNo', e.target.value)} />
          ) : (
            booking.seatNo
          )}
        </td>
        <td>
          {isEditing[booking.bookingId] ? (
            <input type="text" value={editValues[booking.bookingId].bookingStatus} onChange={(e) => handleInputChange(booking.bookingId, 'bookingStatus', e.target.value)} />
          ) : (
            booking.bookingStatus
          )}
        </td>
        <td>
          {isEditing[booking.bookingId] ? (
            <input type="text" value={editValues[booking.bookingId].amount} onChange={(e) => handleInputChange(booking.bookingId, 'amount', e.target.value)} />
          ) : (
            booking.amount
          )}
        </td>
        <td>
          {isEditing[booking.bookingId] ? (
            <>
              <button className="btn btn-success mr-2" onClick={() => updateBooking(booking.bookingId)}>Save</button>
              <button className="btn btn-secondary" onClick={() => toggleEdit(booking.bookingId)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn btn-primary mr-2" onClick={() => toggleEdit(booking.bookingId, booking)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteBookingById(booking.bookingId)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>All Bookings</h2>
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Booking Type</th>
              <th>Venue ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seat No</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderBookingRows()}</tbody>
        </table>
      </div>
      <div>
        <Link to="/add-booking" className="btn btn-primary">
          Add Booking
        </Link>
      </div>
    </div>
  );
};

export default AllBooking;
