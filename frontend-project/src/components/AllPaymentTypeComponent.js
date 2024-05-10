import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PaymentTypeService from '../services/PaymentTypeService';

const AllPaymentTypeComponent = () => {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [error, setError] = useState('');
  const [editedPaymentType, setEditedPaymentType] = useState(null);

  useEffect(() => {
    fetchAllPaymentTypes();
  }, []);

  const fetchAllPaymentTypes = async () => {
    try {
      const response = await PaymentTypeService.getAllPaymentTypes();
      setPaymentTypes(response.data);
    } catch (error) {
      console.error('Failed to fetch payment types:', error);
      setError('Failed to fetch payment types');
    }
  };

  const deletePaymentType = async (paymentTypeId) => {
    try {
      await PaymentTypeService.deletePaymentTypeById(paymentTypeId);
      setPaymentTypes(paymentTypes.filter((paymentType) => paymentType.paymentTypeId !== paymentTypeId));
      window.alert('Payment type deleted successfully');
    } catch (error) {
      console.error('Error deleting payment type:', error);
      setError('Error deleting payment type');
    }
  };

  const startEdit = (paymentType) => {
    setEditedPaymentType({ ...paymentType });
  };

  const cancelEdit = () => {
    setEditedPaymentType(null);
  };

  const saveChanges = async () => {
    try {
      // Check if the new payment type name already exists
      const isDuplicate = paymentTypes.some((type) => type.typeName === editedPaymentType.typeName && type.paymentTypeId !== editedPaymentType.paymentTypeId);
      if (isDuplicate) {
        window.alert('Payment type name already exists');
        return;
      }

      await PaymentTypeService.updatePaymentType(editedPaymentType.paymentTypeId, editedPaymentType);
      const updatedPaymentTypes = paymentTypes.map((paymentType) => {
        if (paymentType.paymentTypeId === editedPaymentType.paymentTypeId) {
          return editedPaymentType;
        }
        return paymentType;
      });
      setPaymentTypes(updatedPaymentTypes);
      window.alert('Payment type updated successfully');
      cancelEdit();
    } catch (error) {
      console.error('Error updating payment type:', error);
      setError('Error updating payment type');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPaymentType({ ...editedPaymentType, [name]: value });
  };

  return (
    <div>
      <h2>All Payment Types</h2>
      {error && <div className="text-danger">{error}</div>}
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Type Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentTypes.map((paymentType) => (
              <tr key={paymentType.paymentTypeId}>
                <td>
                  {editedPaymentType && editedPaymentType.paymentTypeId === paymentType.paymentTypeId ? (
                    <input
                      type="text"
                      name="typeName"
                      value={editedPaymentType.typeName}
                      onChange={handleInputChange}
                    />
                  ) : (
                    paymentType.typeName
                  )}
                </td>
                <td>
                  {editedPaymentType && editedPaymentType.paymentTypeId === paymentType.paymentTypeId ? (
                    <>
                      <button className="btn btn-success mr-2" onClick={saveChanges}>
                        Save
                      </button>
                      <button className="btn btn-secondary" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary mr-2" onClick={() => startEdit(paymentType)}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => deletePaymentType(paymentType.paymentTypeId)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Link to="/add-payment-type" className="btn btn-primary">
          Add Payment Type
        </Link>
      </div>
    </div>
  );
};

export default AllPaymentTypeComponent;
