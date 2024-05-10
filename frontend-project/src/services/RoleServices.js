import axios from 'axios';

const ROLE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/roles';

class RoleServices {
  // Create a role
  createRole(role) {
    return axios.post(ROLE_BASE_REST_API_URL, role);
  }

  // Retrieve all roles
  getAllRoles() {
    return axios.get(ROLE_BASE_REST_API_URL);
  }

  // Retrieve a role by ID
  getRoleById(id) {
    return axios.get(`${ROLE_BASE_REST_API_URL}/${id}`);
  }

  // Update a role
  updateRole(roleId, role) {
    return axios.put(`${ROLE_BASE_REST_API_URL}/${roleId}`, role);
  }

  // Delete a role
  deleteRole(id) {
    return axios.delete(`${ROLE_BASE_REST_API_URL}/${id}`);
  }
}

// Create an instance of the class
const roleServicesInstance = new RoleServices();

// Export the instance as the default module
export default roleServicesInstance;
