import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserServices from '../services/UserServices';

const AllUsersComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await UserServices.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      window.alert('Failed to fetch users');
    }
  };

  const deleteUser = async (user) => {
    const userId = user.userId; // Extracting user ID from the user object
    if (!userId) {
      console.error('User ID is undefined or null.');
      window.alert('User ID is undefined or null.');
      return;
    }
  
    try {
      await UserServices.deleteUser(userId);
      const updatedUsers = users.filter(u => u.userId !== userId); // Changed 'user' variable to 'u' to avoid conflict
      setUsers(updatedUsers);
      window.alert('User deleted successfully');
      console.log('User deleted successfully');
    } catch (error) {
      window.alert('Error deleting user:');
      console.error('Error deleting user:', error.response ? error.response.data : error);
    }
  };
  

  const renderUserRows = () => {
    return users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.datep}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.gender}</td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteUser(user)}>Delete</button>
        </td>
      </tr>
    ));
  };
  
  return (
    <div>
      <h2>All Users</h2>
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Date</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderUserRows()}</tbody>
        </table>
      </div>
      <div>
        <Link to="/add-user" className="btn btn-primary">
          Add User
        </Link>
      </div>
    </div>
  );
};

export default AllUsersComponent;