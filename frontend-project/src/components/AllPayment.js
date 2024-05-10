
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentService from '../services/PaymentService';

const AllPayment = () => {
  const [payments, setPayments] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchAllPayments();
  }, []);

  const fetchAllPayments = async () => {
    try {
      const response = await PaymentService.getAllPayments();
      setPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      window.alert('Failed to fetch payments');
    }
  };

  const deletePayment = async (paymentId) => {
    try {
      await PaymentService.deletePayment(paymentId);
      const updatedPayments = payments.filter(payment => payment.bookingId !== paymentId);
      setPayments(updatedPayments);
      window.alert('Payment deleted successfully');
    } catch (error) {
      window.alert('Error deleting payment');
      console.error('Error deleting payment:', error);
    }
  };

  const toggleEdit = (paymentId, payment) => {
    setIsEditing({ ...isEditing, [paymentId]: !isEditing[paymentId] });
    if (!isEditing[paymentId]) { // When starting to edit
      setEditValues({ ...editValues, [paymentId]: payment });
    }
  };

  const handleInputChange = (paymentId, field, value) => {
    setEditValues({
      ...editValues,
      [paymentId]: { ...editValues[paymentId], [field]: value },
    });
  };

  const updatePayment = async (paymentId) => {
    const updatedPayment = editValues[paymentId];
    try {
      await PaymentService.updatePayment(paymentId, updatedPayment);
      const updatedPayments = payments.map(payment => payment.bookingId === paymentId ? { ...payment, ...updatedPayment } : payment);
      setPayments(updatedPayments);
      setIsEditing({ ...isEditing, [paymentId]: false });
      setEditValues({ ...editValues, [paymentId]: undefined });
      window.alert('Payment updated successfully');
    } catch (error) {
      if (error.response && error.response.status === 500) {
        window.alert("The payments added are already in database");
      } else {
        window.alert('Error updating payment');
        console.error('Error updating payment:', error);
      }
    }
  };

  const renderPaymentRows = () => {
    return payments.map((payment) => (
      <tr key={payment.bookingId}>
        <td>
          {isEditing[payment.bookingId] ? (
            <input type="number" value={editValues[payment.bookingId].userId} onChange={(e) => handleInputChange(payment.bookingId, 'userId', e.target.value)} />
          ) : (
            payment.userId
          )}
        </td>
        <td>
          {isEditing[payment.bookingId] ? (
            <input type="date" value={editValues[payment.bookingId].paymentDate} onChange={(e) => handleInputChange(payment.bookingId, 'paymentDate', e.target.value)} />
          ) : (
            payment.paymentDate
          )}
        </td>
        <td>
          {isEditing[payment.bookingId] ? (
            <input type="time" value={editValues[payment.bookingId].paymentTime} onChange={(e) => handleInputChange(payment.bookingId, 'paymentTime', e.target.value)} />
          ) : (
            payment.paymentTime
          )}
        </td>
        <td>
          {isEditing[payment.bookingId] ? (
            <input type="number" value={editValues[payment.bookingId].paymentType} onChange={(e) => handleInputChange(payment.bookingId, 'paymentType', e.target.value)} />
          ) : (
            payment.paymentType
          )}
        </td>
        <td>
          {isEditing[payment.bookingId] ? (
            <input type="number" value={editValues[payment.bookingId].amount} onChange={(e) => handleInputChange(payment.bookingId, 'amount', e.target.value)} />
          ) : (
            payment.amount
          )}
        </td>
        <td>
          {isEditing[payment.bookingId] ? (
            <input type="text" value={editValues[payment.bookingId].paymentStatus} onChange={(e) => handleInputChange(payment.bookingId, 'paymentStatus', e.target.value)} />
          ) : (
            payment.paymentStatus
          )}
        </td>
        <td>
          {isEditing[payment.bookingId] ? (
            <>
              <button className="btn btn-success mr-2" onClick={() => updatePayment(payment.bookingId)}>Save</button>
              <button className="btn btn-secondary" onClick={() => toggleEdit(payment.bookingId)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn btn-primary mr-2" onClick={() => toggleEdit(payment.bookingId, payment)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deletePayment(payment.bookingId)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>All Payments</h2>
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Payment Date</th>
              <th>Payment Time</th>
              <th>Payment Type</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderPaymentRows()}</tbody>
        </table>
      </div>
      <div>
        <Link to="/add-payment" className="btn btn-primary">
          Add Payment
        </Link>
      </div>
    </div>
  );
};

export default AllPayment;