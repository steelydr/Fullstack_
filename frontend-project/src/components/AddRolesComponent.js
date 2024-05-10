import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RoleTableService from '../services/RoleServices';

const AddRoleComponent = () => {
  const [roleName, setRoleName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const saveRole = (e) => {
    e.preventDefault();
    if (!roleName) {
      setError('Role name is required');
      return;
    }
  
    const role = { roleName };
  
    // Check if the role name already exists
    RoleTableService.getAllRoles()
      .then((response) => {
        const existingRoles = response.data;
        const isDuplicate = existingRoles.some((existingRole) => existingRole.roleName === roleName);
        if (isDuplicate) {
          window.alert('Role name already exists');
        } else {
          // If role name is unique, proceed with creating the role
          RoleTableService.createRole(role)
            .then((response) => {
              console.log(response.data);
              window.alert('Role Successfully created');
              navigate('/roles');
            })
            .catch((error) => {
              setError('An error occurred. Please try again later.');
              console.log(error);
            });
        }
      })
      .catch((error) => {
        setError('An error occurred while checking for existing roles. Please try again later.');
        console.log(error);
      });
  };
  

  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Role</h3>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Role Name</label>
                  <input
                    type="text"
                    placeholder="Enter role name"
                    name="roleName"
                    className="form-control"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                  />
                </div>
                {error && <div className="text-danger mb-2">{error}</div>}
                <button className="btn btn-success" onClick={saveRole}>
                  Submit
                </button>
                <Link to="/roles" className="btn btn-danger ms-2">
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

export default AddRoleComponent;