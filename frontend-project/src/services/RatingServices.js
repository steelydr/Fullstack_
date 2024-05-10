import axios from 'axios';

const RATING_BASE_REST_API_URL = 'http://localhost:8080/api/v1/ratings';

class RatingServices {
  // Create a rating
  createRating(rating) {
    return axios.post(RATING_BASE_REST_API_URL, rating);
  }

  // Retrieve all ratings
  getAllRatings() {
    return axios.get(RATING_BASE_REST_API_URL);
  }

  // Retrieve ratings by userId
  getRatingsByUserId(userId) {
    return axios.get(`${RATING_BASE_REST_API_URL}/user/${userId}`);
  }

  // Update a rating
  updateRating(userId, artistId, movieId, gameId, rating) {
    return axios.put(`${RATING_BASE_REST_API_URL}/${userId}/${artistId}/${movieId}/${gameId}`, rating);
  }

  // Delete a rating
  deleteRating(userId, artistId, movieId, gameId) {
    return axios.delete(`${RATING_BASE_REST_API_URL}/${userId}/${artistId}/${movieId}/${gameId}`);
  }
}

// Create an instance of the class
const ratingServicesInstance = new RatingServices();

// Export the instance as the default module
export default ratingServicesInstance;
