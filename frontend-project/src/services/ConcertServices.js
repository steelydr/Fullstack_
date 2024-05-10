import axios from 'axios';

const CONCERT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/concerts';

class ConcertServices {
  // Get all concerts
  getAllConcerts() {
    return axios.get(CONCERT_BASE_REST_API_URL);
  }

  // Create concert
  createConcert(concert) {
    return axios.post(CONCERT_BASE_REST_API_URL, concert);
  }

  // Get concert by ID
  getConcertById(id) {
    return axios.get(`${CONCERT_BASE_REST_API_URL}/${id}`);
  }

  // Update concert
  updateConcert(id, concert) {
    return axios.put(`${CONCERT_BASE_REST_API_URL}/${id}`, concert);
  }

  // Delete concert
  deleteConcert(id) {
    return axios.delete(`${CONCERT_BASE_REST_API_URL}/${id}`);
  }
}

// Create an instance of the class
const concertServicesInstance = new ConcertServices();

// Export the instance as the default module
export default concertServicesInstance;
