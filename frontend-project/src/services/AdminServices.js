import axios from 'axios';

const ADMIN_BASE_REST_API_URL = 'http://localhost:8080/api/v1/admin';

class AdminServices {
  // Get all admins
  getAllAdmins() {
    return axios.get(ADMIN_BASE_REST_API_URL);
  }

  // Create admin
  createAdmin(admin) {
    return axios.post(ADMIN_BASE_REST_API_URL, admin);
  }

  // Get admin by ID
  getAdminById(id) {
    return axios.get(`${ADMIN_BASE_REST_API_URL}/${id}`);
  }

  // Update admin
  updateAdmin(id, admin) {
    return axios.put(`${ADMIN_BASE_REST_API_URL}/${id}`, admin);
  }

  // Delete admin
  deleteAdmin(id) {
    return axios.delete(`${ADMIN_BASE_REST_API_URL}/${id}`);
  }
}

// Create an instance of the class
const adminServicesInstance = new AdminServices();

// Export the instance as the default module
export default adminServicesInstance;
