import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoleServices from '../services/RoleServices';

const AllRolesComponent = () => {
  const [roles, setRoles] = useState([]);
  const [editedRole, setEditedRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const fetchAllRoles = async () => {
    try {
      const response = await RoleServices.getAllRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      window.alert('Failed to fetch roles');
    }
  };

  const deleteRole = async (roleId) => {
    if (!roleId) {
      console.error('Role ID is undefined or null.');
      window.alert('Role ID is undefined or null.');
      return;
    }

    try {
      await RoleServices.deleteRole(roleId);
      setRoles(roles.filter((role) => role.roleId !== roleId));
      window.alert('Role deleted successfully');
      console.log('Role deleted successfully');
    } catch (error) {
      window.alert('Error deleting role:');
      console.error('Error deleting role:', error.response ? error.response.data : error);
    }
  };

  const updateRoleName = async (roleId, newRoleName) => {
    try {
      // Check if the new role name already exists
      const roleWithSameName = roles.find(role => role.roleName === newRoleName);
      if (roleWithSameName && roleWithSameName.roleId !== roleId) {
        // If role with the same name exists and it's not the same role being edited, show error
        window.alert('Role with the same name already exists. Please choose a different name.');
        return;
      }
  
      const response = await RoleServices.updateRole(roleId, { roleName: newRoleName });
      const updatedRole = response.data; // Assuming the response contains the updated role object
      const updatedRoles = roles.map(role => {
        if (role.roleId === updatedRole.roleId) {
          return updatedRole; // Replace the old role with the updated one
        } else {
          return role;
        }
      });
      setRoles(updatedRoles);
      console.log('Role updated successfully:', updatedRole);
      window.alert('Role updated successfully');
      setIsEditing(false); // Exit edit mode
      setEditedRole(null); // Reset editedRole state
    } catch (error) {
      console.error('Error updating role:', error.response ? error.response.data : error);
      window.alert('Error updating role');
    }
  };
  
  

  const startEdit = (role) => {
    setEditedRole(role);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setEditedRole(null);
    setIsEditing(false);
  };

  const renderRoleRows = () => {
    return roles.map((role) => (
      <tr key={role.roleId}>
        <td>
          {isEditing && editedRole && editedRole.roleId === role.roleId ? (
            <input
              type="text"
              value={editedRole.roleName}
              onChange={(e) => setEditedRole({ ...editedRole, roleName: e.target.value })}
            />
          ) : (
            role.roleName
          )}
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => deleteRole(role.roleId)}>
            Delete
          </button>
          {isEditing && editedRole && editedRole.roleId === role.roleId ? (
            <>
              <button className="btn btn-primary ml-2" onClick={() => updateRoleName(role.roleId, editedRole.roleName)}>
                Save
              </button>
              <button className="btn btn-secondary ml-2" onClick={cancelEdit}>
                Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-primary ml-2" onClick={() => startEdit(role)}>
              Edit
            </button>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>All Roles</h2>
      <div className="btn-container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderRoleRows()}</tbody>
        </table>
      </div>
      <div>
        <Link to="/roles" className="btn btn-primary">
          Add Role
        </Link>
      </div>
    </div>
  );
};

export default AllRolesComponent;
