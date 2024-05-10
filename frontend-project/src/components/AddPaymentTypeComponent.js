import React, { useState } from 'react';
import PaymentTypeService from '../services/PaymentTypeService';

const AddPaymentTypeComponent = () => {
  const [typeName, setTypeName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!typeName) {
      window.alert('Please enter a payment type name');
      return;
    }

    try {
      await PaymentTypeService.addPaymentType({ typeName });
      window.alert('Payment type added successfully');
      setTypeName('');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        window.alert('Payment type name already exists');
      } else {
        console.error('Error adding payment type:', error);
        window.alert('Error adding payment type');
      }
    }
  };

  const handleTypeNameChange = (event) => {
    setTypeName(event.target.value);
  };

  return (
    <div>
      <h2>Add Payment Type</h2>
      {error && <div className="text-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="typeName">Payment Type Name:</label>
          <input
            type="text"
            className="form-control"
            id="typeName"
            value={typeName}
            onChange={handleTypeNameChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddPaymentTypeComponent;
