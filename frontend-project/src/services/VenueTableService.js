import axios from 'axios';

const VENUE_BASE_REST_API_URL = 'http://localhost:8080/api/v1/venue';

class VenueService {
  getAllVenues() {
    return axios.get(VENUE_BASE_REST_API_URL);
  }

  createVenue(venue) {
    return axios.post(VENUE_BASE_REST_API_URL, venue);
  }

  getVenueById(id) {
    return axios.get(`${VENUE_BASE_REST_API_URL}/${id}`);
  }

  deleteVenueById(id) {
    return axios.delete(`${VENUE_BASE_REST_API_URL}/${id}`);
  }

  updateVenue(id, venueDetails) {
    return axios.put(`${VENUE_BASE_REST_API_URL}/${id}`, venueDetails);
  }
}

// Create an instance of the class
const venueServiceInstance = new VenueService();

// Export the instance as the default module
export default venueServiceInstance;
