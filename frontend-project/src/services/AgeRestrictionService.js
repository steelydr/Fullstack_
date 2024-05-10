import axios from 'axios';

const AGE_RESTRICTION_BASE_REST_API_URL = 'http://localhost:8080/api/v1/age-restriction';

class AgeRestrictionService {
  getAllAgeRestrictions() {
    return axios.get(AGE_RESTRICTION_BASE_REST_API_URL);
  }

  addAgeRestriction(ageRestriction) {
    return axios.post(AGE_RESTRICTION_BASE_REST_API_URL, ageRestriction);
  }

  getAgeRestrictionById(id) {
    return axios.get(`${AGE_RESTRICTION_BASE_REST_API_URL}/${id}`);
  }

  deleteAgeRestrictionById(id) {
    return axios.delete(`${AGE_RESTRICTION_BASE_REST_API_URL}/${id}`);
  }

  updateAgeRestriction(id, ageRestrictionDetails) {
    return axios.put(`${AGE_RESTRICTION_BASE_REST_API_URL}/${id}`, ageRestrictionDetails);
  }
}

// Create an instance of the class
const ageRestrictionServiceInstance = new AgeRestrictionService();

// Export the instance as the default module
export default ageRestrictionServiceInstance;
