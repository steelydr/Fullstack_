import axios from 'axios';

const USER_BASE_REST_API_URL = 'http://localhost:8080/api/v1/user';

class UserServices {
  // Create a user
  createUser(user) {
    return axios.post(USER_BASE_REST_API_URL, user);
  }

  // Retrieve all users
  getAllUsers() {
    return axios.get(USER_BASE_REST_API_URL);
  }

  // Retrieve a user by ID
  getUserById(id) {
    return axios.get(`${USER_BASE_REST_API_URL}/${id}`);
  }

  updateUser(userId, user) {
    return axios.put(`${USER_BASE_REST_API_URL}/${userId}`, user);
  }

  // Delete a user
  deleteUser(userId) {
    return axios.delete(`${USER_BASE_REST_API_URL}/${userId}`);
  }
}

// Create an instance of the class
const userServicesInstance = new UserServices();

// Export the instance as the default module
export default userServicesInstance;