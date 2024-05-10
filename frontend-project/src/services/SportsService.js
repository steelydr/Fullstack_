import axios from 'axios';

const SPORTS_BASE_REST_API_URL = 'http://localhost:8080/api/v1/sports';

class SportsService {
  getAllSports() {
    return axios.get(SPORTS_BASE_REST_API_URL);
  }

  addSports(sports) {
    return axios.post(SPORTS_BASE_REST_API_URL, sports);
  }

  getSportsById(id) {
    return axios.get(`${SPORTS_BASE_REST_API_URL}/${id}`);
  }

  deleteSportsById(id) {
    return axios.delete(`${SPORTS_BASE_REST_API_URL}/${id}`);
  }

  updateSports(id, sportsDetails) {
    return axios.put(`${SPORTS_BASE_REST_API_URL}/${id}`, sportsDetails);
  }
}

// Create an instance of the class
const sportsServiceInstance = new SportsService();

// Export the instance as the default module
export default sportsServiceInstance;
