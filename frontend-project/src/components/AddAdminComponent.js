import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminServices from '../services/AdminServices';
import RoleServices from '../services/RoleServices';

const AddAdminComponent = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roleId, setRoleId] = useState(''); // Change to roleId
  const [usernameError, setUsernameError] = useState('');
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const fetchRoles = async () => {
    try {
      const response = await RoleServices.getAllRoles();
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const saveAdmin = async (e) => {
    e.preventDefault();
    try {
      if (!name || !username || !email || !password || !phoneNumber || !roleId) {
        window.alert("All fields are required.");
        return;
      }
  
      // Additional validation for username
      const usernameRegex = /^[A-Za-z0-9_]+$/; // Username should be in combination of letters, numbers, and underscore
      if (!usernameRegex.test(username)) {
        window.alert("Username should contain only letters, numbers, and underscore.");
        return;
      }
  
      // Additional validation for password
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Password should have at least one digit, one lowercase, one uppercase, one special character and minimum length of 8 characters
      if (!passwordRegex.test(password)) {
        window.alert("Password should contain at least one digit, one lowercase letter, one uppercase letter, one special character, and minimum length of 8 characters.");
        return;
      }
  
      // Additional validation for email
      const emailRegex = /^[^\s@]+@gmail\.com$/; // Email should end with @gmail.com
      if (!emailRegex.test(email)) {
        window.alert("Email should end with @gmail.com.");
        return;
      }
  
      const admin = {
        name,
        username,
        email,
        password,
        phoneNumber,
        roleId
      };
  
      const response = await AdminServices.createAdmin(admin);
      console.log(response.data);
      window.alert("Admin Successfully Added");
      setUsernameError('');
      navigate('/admin');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        window.alert("The Resource you are trying to enter already exists");
      } else {
        window.alert("An error occurred. Please enter the details correctly");
        console.log(error);
      }
    }
  };
  
  

  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Admin</h3>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && <div className="text-danger">{usernameError}</div>}
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Role ID</label> {/* Change label */}
                  <input
                    type="text"
                    placeholder="Enter role ID"
                    className="form-control"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <button className="btn btn-success" onClick={saveAdmin}>Submit</button>
                  <Link to="/admin" className="btn btn-danger">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminComponent;