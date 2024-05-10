import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminServices from '../services/AdminServices';

const AllAdminComponent = () => {
  const [admins, setAdmins] = useState([]);
  const [isEditing, setIsEditing] = useState({});
  const [editValues, setEditValues] = useState({});

  useEffect(() => {
    fetchAllAdmins();
  }, []);

  const fetchAllAdmins = async () => {
    try {
      const response = await AdminServices.getAllAdmins();
      setAdmins(response.data);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      window.alert('Failed to fetch admins');
    }
  };

  const deleteAdmin = async (adminId) => {
    try {
      await AdminServices.deleteAdmin(adminId);
      const updatedAdmins = admins.filter(admin => admin.adminId !== adminId);
      setAdmins(updatedAdmins);
      window.alert('Admin deleted successfully');
    } catch (error) {
      window.alert('Error deleting admin');
      console.error('Error deleting admin:', error);
    }
  };

  const toggleEdit = (adminId, admin) => {
    setIsEditing({ ...isEditing, [adminId]: !isEditing[adminId] });
    if (!isEditing[adminId]) { // When starting to edit
      setEditValues({ ...editValues, [adminId]: admin });
    }
  };

  const handleInputChange = (adminId, field, value) => {
    setEditValues({
      ...editValues,
      [adminId]: { ...editValues[adminId], [field]: value },
    });
  };

  const updateAdmin = async (adminId) => {
    const updatedAdmin = editValues[adminId];
    try {
      // Assuming updateAdmin API call exists and works as expected
      await AdminServices.updateAdmin(adminId, updatedAdmin);
      const updatedAdmins = admins.map(admin => admin.adminId === adminId ? { ...admin, ...updatedAdmin } : admin);
      setAdmins(updatedAdmins);
      setIsEditing({ ...isEditing, [adminId]: false });
      setEditValues({ ...editValues, [adminId]: undefined });
      window.alert('Admin updated successfully');
    } catch (error) {
      window.alert('Error updating admin');
      console.error('Error updating admin:', error);
    }
  };

  const renderAdminRows = () => {
    return admins.map((admin) => (
      <tr key={admin.adminId}>
        <td>
          {isEditing[admin.adminId] ? (
            <input type="text" value={editValues[admin.adminId].name} onChange={(e) => handleInputChange(admin.adminId, 'name', e.target.value)} />
          ) : (
            admin.name
          )}
        </td>
        <td>
          {isEditing[admin.adminId] ? (
            <input type="text" value={editValues[admin.adminId].username} onChange={(e) => handleInputChange(admin.adminId, 'username', e.target.value)} />
          ) : (
            admin.username
          )}
        </td>
        <td>
          {isEditing[admin.adminId] ? (
            <input type="text" value={editValues[admin.adminId].email} onChange={(e) => handleInputChange(admin.adminId, 'email', e.target.value)} />
          ) : (
            admin.email
          )}
        </td>
        <td>
          {isEditing[admin.adminId] ? (
            <input type="text" value={editValues[admin.adminId].phoneNumber} onChange={(e) => handleInputChange(admin.adminId, 'phoneNumber', e.target.value)} />
          ) : (
            admin.phoneNumber
          )}
        </td>
        <td>
          {isEditing[admin.adminId] ? (
            <>
              <button className="btn btn-success mr-2" onClick={() => updateAdmin(admin.adminId)}>Save</button>
              <button className="btn btn-secondary" onClick={() => toggleEdit(admin.adminId)}>Cancel</button>
            </>
          ) : (
            <>
              <button className="btn btn-primary mr-2" onClick={() => toggleEdit(admin.adminId, admin)}>Edit</button>
              <button className="btn btn-danger" onClick={() => deleteAdmin(admin.adminId)}>Delete</button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>All Admins</h2>
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderAdminRows()}</tbody>
        </table>
      </div>
      <div>
        <Link to="/add-admin" className="btn btn-primary">
          Add Admin
        </Link>
      </div>
    </div>
  );
};

export default AllAdminComponent;
