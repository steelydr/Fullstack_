import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookingTypeService from '../services/BookingTypeService';

const AllBookingTypeComponent = () => {
  const [bookingTypes, setBookingTypes] = useState([]);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedBookingName, setEditedBookingName] = useState('');

  useEffect(() => {
    fetchAllBookingTypes();
  }, []);

  const fetchAllBookingTypes = async () => {
    try {
      const response = await BookingTypeService.getAllBookingTypes();
      setBookingTypes(response.data);
    } catch (error) {
      console.error('Failed to fetch booking types:', error);
      setError('Failed to fetch booking types');
    }
  };

  const deleteBookingType = async (bookingTypeId) => {
    try {
      await BookingTypeService.deleteBookingTypeById(bookingTypeId);
      setBookingTypes(bookingTypes.filter((bookingType) => bookingType.bookingTypeId !== bookingTypeId));
      window.alert('Booking type deleted successfully');
    } catch (error) {
      window.alert('Error deleting booking type:', error);
      setError('Error deleting booking type');
    }
  };

  const updateBookingType = async (bookingTypeId) => {
    try {
      await BookingTypeService.updateBookingType(bookingTypeId, { bookingName: editedBookingName });
      fetchAllBookingTypes();
      window.alert('Booking type updated successfully');
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      console.error('Error updating booking type:', error);
      setError('Error updating booking type');
    }
  };

  const handleEdit = (bookingName) => {
    setIsEditing(true);
    setEditedBookingName(bookingName);
  };

  return (
    <div>
      <h2>All Booking Types</h2>
      {error && <div className="text-danger">{error}</div>}
      <div className="btn-container">
        <Link to="/add-booking-type" className="btn btn-primary mb-3">
          Add Booking Type
        </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingTypes.map((bookingType) => (
              <tr key={bookingType.bookingTypeId}>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedBookingName}
                      onChange={(e) => setEditedBookingName(e.target.value)}
                    />
                  ) : (
                    bookingType.bookingName
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <button className="btn btn-primary mr-2" onClick={() => updateBookingType(bookingType.bookingTypeId)}>
                      Save
                    </button>
                  ) : (
                    <button className="btn btn-primary mr-2" onClick={() => handleEdit(bookingType.bookingName)}>
                      Edit
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={() => deleteBookingType(bookingType.bookingTypeId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookingTypeComponent;

